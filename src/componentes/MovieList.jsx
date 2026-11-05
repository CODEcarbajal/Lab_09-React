import MovieCard from './MovieCard.jsx'

export default function MovieList({ peliculas, favoriteIds = [], onToggleFavorite }) {
  return (
    <section id="cartelera" className="cartelera" aria-labelledby="titulo-cartelera">
      <div className="titulo-seccion">
        <h2 id="titulo-cartelera">En nuestra pantalla</h2>
        <p className="nota">{peliculas.length} películas · Horarios de demostración</p>
      </div>
      <p className="favorites-count" role="status">
        {favoriteIds.length} {favoriteIds.length === 1 ? 'película favorita' : 'películas favoritas'}
      </p>
      <div className="rejilla">
        {peliculas.map((pelicula) => (
          <MovieCard
            key={pelicula.id}
            pelicula={pelicula}
            isFavorite={favoriteIds.includes(pelicula.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  )
}
