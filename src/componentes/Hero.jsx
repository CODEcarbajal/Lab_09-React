export default function Hero({ pelicula }) {
  return (
    <section className="portada" aria-labelledby="titulo-principal">
      <div className="portada-contenido">
        <span className="etiqueta">Nuestra película destacada</span>
        <h1 id="titulo-principal">{pelicula.titulo}</h1>
        <div className="portada-meta">
          <span className="clasificacion">{pelicula.clasificacion}</span>
          <span className="valoracion" aria-label={`${pelicula.valoracion} de 5 estrellas`}>
            ★ {pelicula.valoracion.toFixed(1)} / 5
          </span>
        </div>
        <p>{pelicula.sinopsis}</p>
        <p className="horarios-titulo">Hoy en pantalla</p>
        <ul className="horarios" aria-label={`Horarios de ${pelicula.titulo}`}>
          {pelicula.horarios.map((hora) => (
            <li key={hora}><time dateTime={hora}>{hora}</time></li>
          ))}
        </ul>
        <a className="portada-enlace" href="#cartelera">Explorar la cartelera <span aria-hidden="true">↗</span></a>
      </div>
      <img className="portada-imagen" src={pelicula.imagen} alt={`Cartel ilustrado de ${pelicula.titulo}`} width="600" height="800" />
    </section>
  )
}
