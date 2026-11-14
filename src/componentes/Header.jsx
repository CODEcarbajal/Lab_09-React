export default function Header({ nombre, navegacion, favoriteCount = 0 }) {
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
        <p className="cabecera-favoritas numeros-tabulares" role="status">
          <span aria-hidden="true">♥ </span>{favoriteCount} {favoriteCount === 1 ? 'favorita' : 'favoritas'}
        </p>
      </div>
    </header>
  )
}
