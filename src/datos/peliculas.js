import { adaptarPelicula } from '../utilidades/adaptarPelicula.js'

// Cartelera ficticia en el formato de origen. Valoraciones sobre 5.
const cartelera = [
  {
    "id": "orbita",
    "title": "Órbita lejana",
    "poster": "/carteles/orbita.svg",
    "overview": "Una astronauta recibe una señal que podría cambiar el destino de su regreso a casa.",
    "certification": "14+",
    "rating": 4.8,
    "showtimes": [
      "16:00",
      "18:30",
      "21:00"
    ]
  },
  {
    "id": "verano",
    "title": "El último verano",
    "poster": "/carteles/verano.svg",
    "overview": "Dos amigos recorren la costa para cumplir una promesa antes de tomar caminos distintos.",
    "certification": "ATP",
    "rating": 4.5,
    "showtimes": [
      "15:00",
      "17:20",
      "19:40"
    ]
  },
  {
    "id": "bosque",
    "title": "El bosque secreto",
    "poster": "/carteles/bosque.svg",
    "overview": "Una joven exploradora descubre una comunidad que protege la memoria del bosque.",
    "certification": "ATP",
    "rating": 4.7,
    "showtimes": [
      "14:00",
      "16:15",
      "18:30"
    ]
  },
  {
    "id": "medianoche",
    "title": "Después de medianoche",
    "poster": "/carteles/medianoche.svg",
    "overview": "Un pianista y una fotógrafa se encuentran en una ciudad que nunca parece dormir.",
    "certification": "14+",
    "rating": 4.6,
    "showtimes": [
      "17:00",
      "19:15",
      "21:30"
    ]
  },
  {
    "id": "marea",
    "title": "Marea adentro",
    "poster": "/carteles/marea.svg",
    "overview": "Una bióloga marina vuelve a su pueblo para salvar el arrecife que marcó su infancia.",
    "certification": "ATP",
    "rating": 4.4,
    "showtimes": [
      "14:30",
      "17:00",
      "19:30"
    ]
  },
  {
    "id": "eco",
    "title": "El eco del silencio",
    "poster": "/carteles/eco.svg",
    "overview": "Una periodista sigue la pista de una grabación que nadie recuerda haber realizado.",
    "certification": "16+",
    "rating": 4.3,
    "showtimes": [
      "18:00",
      "20:15",
      "22:30"
    ]
  },
  {
    "id": "casa",
    "title": "Una casa en las nubes",
    "poster": "/carteles/casa.svg",
    "overview": "Un inventor y su nieta construyen una máquina para encontrar un lugar al que pertenecer.",
    "certification": "ATP",
    "rating": 4.9,
    "showtimes": [
      "13:30",
      "15:45",
      "18:00"
    ]
  },
  {
    "id": "ruta",
    "title": "Ruta al amanecer",
    "poster": "/carteles/ruta.svg",
    "overview": "Tres desconocidos comparten un viaje por los Andes y descubren una nueva oportunidad.",
    "certification": "14+",
    "rating": 4.5,
    "showtimes": [
      "15:30",
      "18:00",
      "20:30"
    ]
  }
]

export const peliculas = cartelera.map(adaptarPelicula)
