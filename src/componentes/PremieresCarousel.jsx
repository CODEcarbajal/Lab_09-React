import { useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize.js'
import Button from './Button/Button.jsx'

export default function PremieresCarousel({ premieres }) {
  const { width } = useWindowSize()
  const visibleCount = width <= 540 ? 1 : width <= 960 ? 2 : 4
  const [position, setPosition] = useState(0)
  const lastPosition = Math.max(0, premieres.length - visibleCount)
  const start = Math.min(position, lastPosition)

  if (premieres.length === 0) return <p role="status">No hay estrenos disponibles.</p>

  return (
    <div role="region" aria-roledescription="carrusel" aria-label="Estrenos">
      <ul className="estrenos-lista" style={{ '--columnas': visibleCount }}>
        {premieres.slice(start, start + visibleCount).map(pelicula => (
          <li key={pelicula.id}>
            <img src={pelicula.imagen} alt={`Cartel de ${pelicula.titulo}`} width="600" height="800" />
            <h3>{pelicula.titulo}</h3>
            <p>{pelicula.clasificacion} · ★ {pelicula.valoracion.toFixed(1)}</p>
          </li>
        ))}
      </ul>
      <div className="estrenos-controles">
        <Button variant="secondary" disabled={start === 0} onClick={() => setPosition(Math.max(0, start - visibleCount))}>Anteriores</Button>
        <p role="status" className="numeros-tabulares">{start + 1}–{Math.min(start + visibleCount, premieres.length)} de {premieres.length}</p>
        <Button variant="secondary" disabled={start === lastPosition} onClick={() => setPosition(Math.min(lastPosition, start + visibleCount))}>Siguientes</Button>
      </div>
    </div>
  )
}
