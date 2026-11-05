import MovieCard from './MovieCard.jsx'

export default function Cartelera({ peliculas }) {
  return (
    <section id="cartelera" className="cartelera" aria-labelledby="titulo-cartelera">
      <div className="titulo-seccion">
        <h2 id="titulo-cartelera">En nuestra pantalla</h2>
        <p className="nota">{peliculas.length} películas · Horarios de demostración</p>
      </div>
      <div className="rejilla">
        {peliculas.map((pelicula) => <MovieCard key={pelicula.id} pelicula={pelicula} />)}
      </div>
    </section>
  )
}
