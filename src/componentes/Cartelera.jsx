import { useState } from 'react'
import { peliculas } from '../datos/peliculas.js'
import { useDebounce } from '../hooks/useDebounce.js'
import Hero from './Hero.jsx'
import MovieList from './MovieList.jsx'

function normalizarTitulo(texto) {
  return texto.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default function Cartelera({ favoriteIds, onToggleFavorite }) {
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 500)
  const consulta = normalizarTitulo(debouncedSearchText)
  const peliculasFiltradas = peliculas.filter(({ titulo }) => normalizarTitulo(titulo).includes(consulta))

  return (
    <>
      <Hero pelicula={peliculas[0]} searchValue={searchText} onSearchChange={setSearchText} />
      <MovieList peliculas={peliculasFiltradas} favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
    </>
  )
}
