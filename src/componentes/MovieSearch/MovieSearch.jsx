import { useId } from 'react'
import Button from '../Button/Button.jsx'

export default function MovieSearch({ value, onChange }) {
  const inputId = useId()
  const hintId = `${inputId}-hint`

  return (
    <div className="movie-search">
      <label className="form-label" htmlFor={inputId}>Título de la película</label>
      <div className="movie-search-controls">
        <input
          className="form-input"
          id={inputId}
          name="movie-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Escribe un título…"
          aria-describedby={hintId}
        />
        <Button variant="secondary" disabled={!value} onClick={() => onChange('')}>Limpiar</Button>
      </div>
      <p id={hintId} className="form-hint texto-secundario">Puedes escribir un título completo o parte de él.</p>
    </div>
  )
}
