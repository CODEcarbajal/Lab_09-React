import { useEffect, useState } from 'react'
import Footer from './componentes/Footer.jsx'
import { cine, navegacion } from './datos/cine.js'
import Header from './componentes/Header.jsx'
import Hero from './componentes/Hero.jsx'
import MovieList from './componentes/MovieList.jsx'
import { peliculas } from './datos/peliculas.js'

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText)
      console.log(`[Buscador] filtrado aplicado después de 500 ms: "${searchText || '(sin filtro)'}"`)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchText])

  const textoNormalizado = debouncedSearchText
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const peliculasFiltradas = peliculas.filter((pelicula) => (
    pelicula.titulo
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(textoNormalizado)
  ))

  function handleSearchChange(value) {
    console.log(`[Buscador] entrada inmediata: "${value || '(sin filtro)'}"`)
    setSearchText(value)
  }

  function toggleFavorite(movieId) {
    setFavoriteIds((currentIds) => (
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId]
    ))
  }

  return (
    <>
      <Header nombre={cine.nombre} navegacion={navegacion} />
      <main id="inicio" className="contenedor">
        <Hero pelicula={peliculas[0]} searchValue={searchText} onSearchChange={handleSearchChange} />
        <MovieList peliculas={peliculasFiltradas} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
      </main>
      <Footer cine={cine} />
    </>
  )
}
