export default function PeliculaCard({ pelicula }) {
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
    </article>
  )
}
