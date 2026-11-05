import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { format, stripVTControlCharacters } from 'node:util'
import { runInNewContext } from 'node:vm'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformWithOxc, version as viteVersion } from 'vite'

assert.notEqual(process.env.NODE_ENV, 'production', 'Ejecuta esta práctica en modo desarrollo para observar las advertencias de React.')

// Los ejemplos se compilan y renderizan en memoria. La aplicación no se modifica.
async function renderizar(codigo) {
  const resultado = await transformWithOxc(codigo, 'Ejemplo.jsx', {
    jsx: { runtime: 'classic' },
  })
  const elemento = runInNewContext(`${resultado.code}\nejemplo`, { React })
  const mensajes = []
  const errorOriginal = console.error

  try {
    console.error = (...argumentos) => mensajes.push(format(...argumentos))
    renderToStaticMarkup(elemento)
  } finally {
    console.error = errorOriginal
  }

  return mensajes.join('\n')
}

const casos = [
  {
    nombre: 'class en lugar de className',
    incorrecto: 'const ejemplo = <div class="cartelera">Cine Aurora</div>',
    correcto: 'const ejemplo = <div className="cartelera">Cine Aurora</div>',
    esperado: /Invalid DOM property `class`\. Did you mean `className`\?/,
    tipo: 'Advertencia de React',
    explicacion: 'En JSX se usa className para asignar clases CSS. La advertencia no detiene la compilación.',
  },
  {
    nombre: 'Dos nodos raíz sin contenedor',
    incorrecto: 'const ejemplo = (<h1>Cine Aurora</h1><p>Cartelera</p>)',
    correcto: 'const ejemplo = (<><h1>Cine Aurora</h1><p>Cartelera</p></>)',
    esperado: /Adjacent JSX elements must be wrapped in an enclosing tag/,
    tipo: 'Error de sintaxis JSX',
    explicacion: 'El JSX debe tener una sola raíz. Un fragmento agrupa los nodos sin añadir un elemento al DOM.',
  },
  {
    nombre: 'map sin la propiedad key',
    incorrecto: 'const ejemplo = <ul>{["16:00", "18:30"].map(hora => <li>{hora}</li>)}</ul>',
    correcto: 'const ejemplo = <ul>{["16:00", "18:30"].map(hora => <li key={hora}>{hora}</li>)}</ul>',
    esperado: /Each child in a list should have a unique "key" prop/,
    tipo: 'Advertencia de React',
    explicacion: 'La key identifica cada elemento entre sus hermanos. MovieList usa pelicula.id y los horarios usan hora.',
  },
]

const registro = [
  'Laboratorio 09 — Registro de errores comunes',
  'Alumno: Luis (luiscucho-oss)',
  `Node ${process.version} | React ${React.version} | Vite ${viteVersion}`,
  'Reproducción: npm run errores -- --registrar',
  'Entorno: renderizado de React en desarrollo y compilador JSX de Vite, sin servidor HTTP.',
]

for (const [indice, caso] of casos.entries()) {
  let mensaje
  try {
    mensaje = await renderizar(caso.incorrecto)
  } catch (error) {
    if (caso.tipo !== 'Error de sintaxis JSX') throw error
    mensaje = stripVTControlCharacters(error.message)
  }

  assert.match(mensaje, caso.esperado, `No se reprodujo el caso: ${caso.nombre}`)
  assert.equal(await renderizar(caso.correcto), '', `La corrección todavía genera advertencias: ${caso.nombre}`)

  registro.push(
    '',
    `${indice + 1}. ${caso.nombre}`,
    `Tipo: ${caso.tipo}`,
    `Código incorrecto: ${caso.incorrecto}`,
    'Mensaje observado:',
    mensaje,
    `Código corregido: ${caso.correcto}`,
    caso.explicacion,
    'Resultado: problema reproducido y corrección sin advertencias.',
  )
}

registro.push('', 'Resultado general: 3 problemas reproducidos y 3 correcciones verificadas.')
const salida = `${registro.join('\n').replace(/[\t ]+$/gm, '')}\n`
console.log(salida)

if (process.argv.includes('--registrar')) {
  const carpeta = new URL('../evidencias/', import.meta.url)
  await mkdir(carpeta, { recursive: true })
  await writeFile(new URL('errores-comunes.txt', carpeta), salida)
}
