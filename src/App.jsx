import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import Cartelera from './componentes/Cartelera.jsx'
import Footer from './componentes/Footer.jsx'
import { cine, navegacion } from './datos/cine.js'
import Header from './componentes/Header.jsx'
import PremieresSection from './componentes/PremieresSection.jsx'
import { peliculas } from './datos/peliculas.js'

const FAVORITES_STORAGE_KEY = 'cine-aurora-favoritas'

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const savedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
      const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : []
      return Array.isArray(parsedFavorites) ? parsedFavorites : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // Las favoritas siguen disponibles durante la sesión si el almacenamiento falla.
    }
  }, [favoriteIds])

  function toggleFavorite(movieId) {
    const pelicula = peliculas.find(({ id }) => id === movieId)
    const wasFavorite = favoriteIds.includes(movieId)

    setFavoriteIds((currentIds) => (
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId]
    ))

    if (wasFavorite) {
      toast.info('Película quitada de favoritas', { id: movieId, description: pelicula.titulo })
    } else {
      toast.success('Película agregada a favoritas', { id: movieId, description: pelicula.titulo })
    }
  }

  return (
    <>
      <Header nombre={cine.nombre} navegacion={navegacion} />
      <main id="inicio" className="contenedor">
        <Cartelera favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
        <PremieresSection />
      </main>
      <Footer cine={cine} />
      <Toaster position="bottom-right" containerAriaLabel="Notificaciones" />
    </>
  )
}
