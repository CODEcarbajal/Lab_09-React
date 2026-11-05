import { useState } from 'react'
import Footer from './componentes/Footer.jsx'
import { cine, navegacion } from './datos/cine.js'
import Header from './componentes/Header.jsx'
import Hero from './componentes/Hero.jsx'
import MovieList from './componentes/MovieList.jsx'
import MovieSearch from './componentes/MovieSearch/MovieSearch.jsx'
import { peliculas } from './datos/peliculas.js'

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [searchText, setSearchText] = useState('')

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
        <Hero pelicula={peliculas[0]} />
        <section className="search-panel" aria-labelledby="search-heading">
          <div>
            <span className="etiqueta">Tu próxima historia</span>
            <h2 id="search-heading">¿Qué película tienes en mente?</h2>
          </div>
          <MovieSearch value={searchText} onChange={setSearchText} />
        </section>
        <MovieList peliculas={peliculas} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
      </main>
      <Footer cine={cine} />
    </>
  )
}
