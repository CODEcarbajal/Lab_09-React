import { useEffect, useState } from 'react'
import { peliculas } from '../datos/peliculas.js'

// Petición local reproducible: shouldFail permite comprobar el estado de error.
export function usePremieres({ delay = 1200, shouldFail = false } = {}) {
  const [request, setRequest] = useState(0)
  const [state, setState] = useState({ loading: true, data: [], error: null })

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(shouldFail
        ? { loading: false, data: [], error: 'No pudimos cargar los estrenos.' }
        : { loading: false, data: peliculas.slice(0, 6), error: null })
    }, delay)
    return () => clearTimeout(timer)
  }, [delay, shouldFail, request])

  function retry() {
    setState({ loading: true, data: [], error: null })
    setRequest(current => current + 1)
  }

  return { ...state, retry }
}
