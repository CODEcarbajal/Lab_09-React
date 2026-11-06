import Footer from './componentes/Footer.jsx'
import { cine, navegacion } from './datos/cine.js'
import Header from './componentes/Header.jsx'
import Hero from './componentes/Hero.jsx'
import MovieList from './componentes/MovieList.jsx'
import { peliculas } from './datos/peliculas.js'

export default function App() {
  return (
    <>
      <Header nombre={cine.nombre} navegacion={navegacion} />
      <main id="inicio" className="contenedor">
        <Hero pelicula={peliculas[0]} />
        <MovieList peliculas={peliculas} /> 
      </main>
      <Footer cine={cine} />
    </>
  )
}
