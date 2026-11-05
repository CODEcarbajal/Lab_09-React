import Footer from './componentes/Footer.jsx'
import { cine, navegacion } from './datos/cine.js'
import Header from './componentes/Header.jsx'
import MovieList from './componentes/MovieList.jsx'
import { peliculas } from './datos/peliculas.js'

export default function App() {
  return (
    <>
      <Header nombre={cine.nombre} navegacion={navegacion} />
      <main id="inicio" className="contenedor">
        <section className="portada" aria-labelledby="titulo-principal">
          <span className="etiqueta">Cine Aurora · El placer de ir al cine</span>
          <h1 id="titulo-principal">Historias que se quedan<br /><em>contigo.</em></h1>
          <p>Apaga el mundo un momento. Descubre tu próxima película y encuentra la función perfecta para ti.</p>
        </section>
        <MovieList peliculas={peliculas} />
      </main>
      <Footer cine={cine} />
    </>
  )
}
