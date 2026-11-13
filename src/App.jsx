import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import Footer from './componentes/Footer.jsx'
import { cine, navegacion } from './datos/cine.js'
import Header from './componentes/Header.jsx'
import Hero from './componentes/Hero.jsx'
import MovieList from './componentes/MovieList.jsx'
import { peliculas } from './datos/peliculas.js'

const FAVORITES_STORAGE_KEY = 'cine-aurora-favoritas'

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const savedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
      const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : []
      return Array.isArray(parsedFavorites) ? parsedFavorites : []
    } catch {
      return []
    }
  })
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      
    }
  }, [favoriteIds])

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
    const pelicula = peliculas.find(({ id }) => id === movieId)
    const wasFavorite = favoriteIds.includes(movieId)

    setFavoriteIds((currentIds) => (
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId]
    ))

    if (wasFavorite) {
      toast.info('Película quitada de favoritas', { id: movieId, description: pelicula.titulo })
    } else {
      toast.success('Película agregada a favoritas', { id: movieId, description: pelicula.titulo })
    }
  }

  return (
    <>
      <Header nombre={cine.nombre} navegacion={navegacion} />
      <main id="inicio" className="contenedor">
        <Hero pelicula={peliculas[0]} searchValue={searchText} onSearchChange={handleSearchChange} />
        <MovieList peliculas={peliculasFiltradas} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
      </main>
      <Footer cine={cine} />
      <Toaster position="bottom-right" containerAriaLabel="Notificaciones" />
    </>
  )
}
