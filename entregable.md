# Entregable — Datos que la aplicación recuerda

## Favoritas

- **Dato:** `favoriteIds`, el arreglo con los identificadores de las películas favoritas.
- **Dónde se decide:** En `src/App.jsx`, porque `App` es el componente que coordina el estado de toda la aplicación. `MovieCard` solo comunica qué película se marca o desmarca, y `MovieList` recibe el estado para mostrar el contador y el aspecto de cada tarjeta.
- **Cómo se recuerda:** Al iniciar, `App` lee la clave `cine-aurora-favoritas` desde `localStorage`. Cada vez que cambia `favoriteIds`, un `useEffect` guarda el arreglo con `JSON.stringify`.
- **Por qué allí:** `App` es el punto común entre los componentes que modifican y muestran las favoritas. Además, colocar la lectura y escritura en un único lugar evita duplicar la lógica de persistencia y permite que las favoritas sobrevivan a una recarga.

## Texto del buscador durante la sesión

- **Dato:** `searchText`, el texto que el usuario está escribiendo.
- **Dónde se decide:** En `src/App.jsx`, y se envía al componente `MovieSearch` mediante props y eventos.
- **Por qué allí:** `App` necesita el texto para filtrar la cartelera y `MovieSearch` solo se encarga de mostrar el campo y avisar cuando cambia su valor.
- **Persistencia:** No se guarda en `localStorage`; se recuerda únicamente mientras la página está abierta. Al recargar, comienza vacío porque el requisito de persistencia corresponde a las películas favoritas.

## Texto usado para filtrar

- **Dato:** `debouncedSearchText`, la copia del texto que se aplica después de 500 ms sin nuevas pulsaciones.
- **Dónde se decide:** En `src/App.jsx`, junto con el efecto que controla el retardo.
- **Por qué allí:** El filtrado y el retardo forman parte de la lógica de la cartelera, mientras que `MovieSearch` mantiene una responsabilidad de presentación y entrada de datos.
- **Persistencia:** No se guarda en `localStorage`; es un estado temporal que se reinicia al cargar la página.
