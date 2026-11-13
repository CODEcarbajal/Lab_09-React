export function adaptarPelicula({ id, title, poster, overview, certification, rating, showtimes }) {
  return {
    id,
    titulo: title,
    imagen: poster,
    sinopsis: overview,
    clasificacion: certification,
    valoracion: rating,
    horarios: [...showtimes],
  }
}
