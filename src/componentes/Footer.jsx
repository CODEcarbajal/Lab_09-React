export default function Footer({ cine }) {
  return (
    <footer id="contacto" className="pie">
      <div className="contenedor">
        <div className="pie-columnas">
          <div>
            <h2>{cine.nombre}</h2>
            <p>Un lugar para encontrarnos.<br />Una historia para llevarnos.</p>
          </div>
          <div>
            <h3>Conversemos</h3>
            <address>
              <a href={`mailto:${cine.correo}`}>{cine.correo}</a>
              <span>{cine.telefono}</span>
              <span>{cine.direccion}</span>
            </address>
          </div>
          <div>
            <h3>Planea tu visita</h3>
            <p>{cine.atencion}</p>
            <p>Horarios en formato de 24 horas.</p>
            <a href="#cartelera">Explorar la cartelera ↗</a>
          </div>
        </div>
        <div className="pie-legal">
          <p>© {cine.anio} {cine.nombre} · Laboratorio 09</p>
          <p>Proyecto educativo. Películas, horarios y contacto ficticios.</p>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  )
}
