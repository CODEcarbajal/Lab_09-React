import Header from './componentes/Header.jsx'
import Cartelera from './componentes/Cartelera.jsx'
import { peliculas } from './datos/peliculas.js'

export default function App() {
  return (
    <>
      <Header nombre="Cine Aurora" navegacion={[
        { texto: 'Inicio', destino: '#inicio' },
        { texto: 'Cartelera', destino: '#cartelera' },
      ]} />
      <main id="inicio" className="contenedor">
        <section className="portada" aria-labelledby="titulo-principal">
          <span className="etiqueta">Cine Aurora · El placer de ir al cine</span>
          <h1 id="titulo-principal">Historias que se quedan<br /><em>contigo.</em></h1>
          <p>Apaga el mundo un momento. Descubre tu próxima película y encuentra la función perfecta para ti.</p>
        </section>
        <Cartelera peliculas={peliculas} />
      </main>
    </>
  )
}
