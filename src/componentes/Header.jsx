export default function Header({ nombre, navegacion }) {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera-interior">
        <a className="marca" href="#inicio" aria-label={`${nombre}, inicio`}>
          <span className="marca-icono" aria-hidden="true">✳</span>
          <span>{nombre}<small>Historias en pantalla grande</small></span>
        </a>
        <nav aria-label="Navegación principal">
          {navegacion.map(({ texto, destino }) => <a key={destino} href={destino}>{texto}</a>)}
        </nav>
      </div>
    </header>
  )
}
