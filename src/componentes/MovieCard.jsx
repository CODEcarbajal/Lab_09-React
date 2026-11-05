import Button from './Button/Button.jsx'

export default function MovieCard({ pelicula, isFavorite = false, onToggleFavorite }) {
  return (
    <article className="pelicula" aria-labelledby={`titulo-${pelicula.id}`}>
      <img src={pelicula.imagen} alt={`Cartel ilustrado de ${pelicula.titulo}`} width="600" height="800" />
      <div className="pelicula-meta">
        <span className="clasificacion">{pelicula.clasificacion}</span>
        <span className="valoracion" aria-label={`${pelicula.valoracion} de 5 estrellas`}>★ {pelicula.valoracion.toFixed(1)} / 5</span>
      </div>
      <h3 id={`titulo-${pelicula.id}`}>{pelicula.titulo}</h3>
      <p className="sinopsis">{pelicula.sinopsis}</p>
      <p className="horarios-titulo">Funciones</p>
      <ul className="horarios" aria-label={`Horarios de ${pelicula.titulo}`}>
        {pelicula.horarios.map((hora) => <li key={hora}><time dateTime={hora}>{hora}</time></li>)}
      </ul>
      <Button
        variant={isFavorite ? 'primary' : 'secondary'}
        className="favorite-button"
        aria-pressed={isFavorite}
        aria-label={`${isFavorite ? 'Quitar de' : 'Agregar a'} favoritas: ${pelicula.titulo}`}
        onClick={() => onToggleFavorite(pelicula.id)}
      >
        <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
        {isFavorite ? 'En favoritas' : 'Agregar a favoritas'}
      </Button>
    </article>
  )
}
