import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { format } from 'node:util'
import { createElement, version as reactVersion } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer, version as viteVersion } from 'vite'
import { peliculas } from '../src/datos/peliculas.js'

const raiz = fileURLToPath(new URL('../', import.meta.url))
const resultados = [
  'Laboratorio 09 — Verificación de componentes y datos',
  `Node ${process.version} | React ${reactVersion} | Vite ${viteVersion}`,
  'Reproducción: npm test -- --registrar',
  'Alcance: renderizado de componentes en memoria; no sustituye la prueba del servidor en navegador.',
]

function comprobar(nombre, prueba) {
  prueba()
  resultados.push(`OK — ${nombre}`)
}

comprobar('Cartelera con al menos ocho películas completas e imágenes existentes', () => {
  assert.ok(peliculas.length >= 8)
  assert.equal(new Set(peliculas.map(pelicula => pelicula.id)).size, peliculas.length)
  for (const pelicula of peliculas) {
    for (const campo of ['id', 'titulo', 'imagen', 'sinopsis', 'clasificacion']) {
      assert.equal(typeof pelicula[campo], 'string')
      assert.ok(pelicula[campo].trim())
    }
    assert.ok(existsSync(new URL(`../public${pelicula.imagen}`, import.meta.url)))
    assert.ok(Number.isFinite(pelicula.valoracion) && pelicula.valoracion >= 0 && pelicula.valoracion <= 5)
    assert.ok(Array.isArray(pelicula.horarios) && pelicula.horarios.length > 0)
    assert.equal(new Set(pelicula.horarios).size, pelicula.horarios.length)
    assert.ok(pelicula.horarios.every(hora => /^([01]\d|2[0-3]):[0-5]\d$/.test(hora)))
  }
})

const servidor = await createServer({
  root: raiz,
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  appType: 'custom',
})
const advertencias = []
const errorOriginal = console.error

try {
  console.error = (...argumentos) => advertencias.push(format(...argumentos))
  const { default: App } = await servidor.ssrLoadModule('/src/App.jsx')
  const { default: Hero } = await servidor.ssrLoadModule('/src/componentes/Hero.jsx')
  const { default: MovieCard } = await servidor.ssrLoadModule('/src/componentes/MovieCard.jsx')
  const { default: MovieList } = await servidor.ssrLoadModule('/src/componentes/MovieList.jsx')
  const { default: Button } = await servidor.ssrLoadModule('/src/componentes/Button/Button.jsx')
  const { default: MovieSearch } = await servidor.ssrLoadModule('/src/componentes/MovieSearch/MovieSearch.jsx')
  const renderizar = (componente, props) => renderToStaticMarkup(createElement(componente, props))
  const alternativa = { id: 'prueba', titulo: 'Película de prueba', imagen: '/carteles/verano.svg', sinopsis: 'Sinopsis de prueba mediante props.', clasificacion: 'ATP', valoracion: 2.5, horarios: ['13:05', '23:10'] }

  for (const [nombre, componente] of [['Hero', Hero], ['MovieCard', MovieCard]]) {
    comprobar(`${nombre} cambia título, cartel, sinopsis, clasificación, valoración y horarios al recibir otras props`, () => {
      const html = renderizar(componente, { pelicula: alternativa })
      for (const texto of [alternativa.titulo, alternativa.imagen, alternativa.sinopsis, alternativa.clasificacion, '2.5 / 5', ...alternativa.horarios]) {
        assert.ok(html.includes(texto), `Falta ${texto} en ${nombre}`)
      }
      assert.ok(!html.includes(peliculas[0].titulo))
    })
  }

  comprobar('MovieList renderiza una tarjeta por película y admite una lista vacía', () => {
    assert.equal((renderizar(MovieList, { peliculas }).match(/<article\b/g) || []).length, peliculas.length)
    assert.equal((renderizar(MovieList, { peliculas: [] }).match(/<article\b/g) || []).length, 0)
  })

  comprobar('Button admite contenido, variantes, estado deshabilitado y enlaces de navegación', () => {
    const button = renderizar(Button, { children: 'Limpiar', variant: 'secondary', disabled: true })
    assert.match(button, /<button[^>]*class="button button--secondary"[^>]*type="button"[^>]*disabled=""/)
    assert.ok(button.includes('Limpiar'))
    const link = renderizar(Button, { children: 'Explorar', href: '#cartelera' })
    assert.match(link, /<a[^>]*class="button button--primary"[^>]*href="#cartelera"/)
    assert.ok(!link.includes('type="button"'))
  })

  comprobar('MovieCard refleja el estado de favorita recibido de App de forma accesible', () => {
    for (const isFavorite of [false, true]) {
      const html = renderizar(MovieCard, { pelicula: alternativa, isFavorite, onToggleFavorite() {} })
      assert.ok(html.includes(`aria-pressed="${isFavorite}"`))
      assert.ok(html.includes(`${isFavorite ? 'Quitar de' : 'Agregar a'} favoritas: ${alternativa.titulo}`))
      assert.ok(html.includes(isFavorite ? 'En favoritas' : 'Agregar a favoritas'))
    }
  })

  comprobar('MovieSearch recibe su valor por props y solo permite limpiar cuando hay texto', () => {
    const empty = renderizar(MovieSearch, { value: '', onChange() {} })
    const filled = renderizar(MovieSearch, { value: 'Órbita & verano', onChange() {} })
    assert.match(filled, /type="search"[^>]*value="Órbita &amp; verano"/)
    assert.match(empty, /<button[^>]*disabled=""/)
    assert.ok(!filled.includes('disabled=""'))
    const id = filled.match(/<input[^>]*id="([^"]+)"/)[1]
    assert.ok(filled.includes(`for="${id}"`))
  })

  comprobar('App integra Header, Hero, las ocho tarjetas y Footer con un único h1', () => {
    const html = renderizar(App)
    assert.match(html, /<header\b[\s\S]*<main\b[\s\S]*<h1\b[\s\S]*<article\b[\s\S]*<footer\b/)
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    assert.equal((html.match(/<article\b/g) || []).length, peliculas.length)
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(coincidencia => coincidencia[1])
    assert.equal(new Set(ids).size, ids.length)
    for (const [, destino] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(destino))
    for (const [, etiquetas] of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
      for (const etiqueta of etiquetas.split(' ')) assert.ok(ids.includes(etiqueta))
    }
  })

  comprobar('Renderizado sin advertencias de React sobre class o key', () => {
    assert.deepEqual(advertencias, [])
  })
} finally {
  console.error = errorOriginal
  await servidor.close()
}

const salida = `${resultados.join('\n')}\n`
console.log(salida)
if (process.argv.includes('--registrar')) {
  await mkdir(new URL('../evidencias/', import.meta.url), { recursive: true })
  await writeFile(new URL('../evidencias/verificacion.txt', import.meta.url), salida)
}
