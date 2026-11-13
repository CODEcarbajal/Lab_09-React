# Cine Aurora · Laboratorio 11

## Laboratorio 11 · Comunicación entre componentes

La rama `codex/lab11-comunicacion-componentes` parte del cierre del Laboratorio 10 (`6ef0cff`). Para reproducir la base, ejecuta `npm ci` y `npm run dev`, y abre la dirección que indique Vite.

Antes de iniciar los cambios se comprobaron las ocho tarjetas, el filtro por título y la persistencia de favoritas al recargar. También se ejecutaron `npm test`, `npm run lint` y `npm run build`.

### Pasos 1 a 6

- Los estilos comparten variables tipográficas y utilidades para texto secundario y cifras tabulares.
- `adaptarPelicula` convierte el formato de origen del catálogo al modelo que consumen `Hero` y `MovieCard`. Conserva los IDs usados en `localStorage`.
- `MovieCard` emite `onToggleFavorite`. `App` actualiza las favoritas y usa Sonner para mostrar el aviso correspondiente.
- `useDebounce(value, delay)` cancela el temporizador al cambiar el valor o desmontar el componente. `Cartelera` lo usa con 500 ms y comparte el estado de búsqueda entre `Hero` y `MovieList`.
- `useWindowSize()` devuelve `{ width, height }` en píxeles y retira su suscripción a `resize` al desmontar. `MovieList` decide si muestra una columna hasta 540 px, dos hasta 960 px o cuatro a partir de 961 px. El carrusel de estrenos puede reutilizar el mismo hook en la segunda parte.

## Laboratorio 10 · Componentes y eventos · Primera parte

Rama de Luis (`luiscucho-oss`): `feat/lab10-componentes-eventos`. Se parte de la versión terminada del laboratorio 9 y se implementan los pasos 1 a 6:

- Estilos de formulario, tipografía, foco de teclado y botones adaptables.
- `Button/Button.jsx`: contenido mediante `children`, variantes `primary` y `secondary`, eventos y atributos nativos. Se reutiliza en Hero, favoritas y el control Limpiar; con `href` conserva la semántica de enlace.
- `App`: estados `favoriteIds` y `searchText`; `toggleFavorite` agrega o quita IDs mediante una actualización funcional.
- `App → MovieList → MovieCard`: estado y función recibidos por props. Las tarjetas muestran el estado con texto, color y `aria-pressed`; el contador anuncia los cambios.
- `MovieSearch/MovieSearch.jsx`: entrada controlada por `value` y `onChange`, con etiqueta asociada y botón Limpiar.

La segunda parte del equipo comprende los pasos 7 a 12. El buscador todavía no filtra la cartelera: quedan pendientes el retardo, filtrado y estado vacío, integración dentro del banner, persistencia, entregable y publicación. Al recargar se reinician los estados de esta primera parte.

Validación: `npm test` y `npm run build`. La prueba interactiva se realiza agregando dos favoritas, quitando una, escribiendo en el buscador y limpiándolo; la segunda favorita debe conservarse. El servidor de desarrollo se inicia con `npm run dev`.

En esta sesión el entorno bloqueó la apertura del puerto de Vite (`EPERM`), por lo que los eventos se comprobaron en Chrome con el bundle de producción autocontenido en una copia temporal. La orden `npm run lint` no pudo ejecutarse porque `oxlint` no está instalado en las dependencias disponibles. No se cambiaron las versiones declaradas ni el lockfile.

---

Proyecto educativo de React con Vite. La cartelera y el contacto serán ficticios.

## Requisitos y ejecución

Verificado con Node v24.18.0 y npm 11.16.0.

```sh
npm install
npm run dev
```

Abre la dirección que indique Vite (normalmente http://localhost:5173).

```sh
npm run build
npm run lint
```

## Procedimiento

1. Plantilla oficial creada con `npm create vite@latest cine-lab09 -- --template react --no-interactive`, dependencias instaladas y servidor iniciado.
2. Andamiaje eliminado: HTML en español y componentes de entrada mínimos.
3. `src/componentes`, `src/datos` y `src/estilos`: CSS por variables, base, distribución y componentes, importados desde `index.css`. No se proporcionó la guía externa; esta arquitectura queda como propuesta adaptable.
4. Ocho películas ficticias con título, cartel SVG local original, sinopsis, clasificación, valoración sobre 5 y horarios. `App → MovieList → MovieCard` demuestra props y listas con claves estables. ATP significa apta para todo público; 14+ y 16+ son edades mínimas ficticias. Los horarios se muestran en formato de 24 horas.
5. Header recibe nombre y navegación mediante props. Comprobado visualmente en el navegador antes de implementar Footer; el enlace Cartelera llega a `#cartelera`.
6. Footer recibe contacto e información por props desde `src/datos/cine.js`. Contacto accesible desde Header y enlaces de regreso a cartelera e inicio. El correo usa el dominio reservado `.example`; sustituir los datos ficticios antes de usar en un cine real.
7. Hero recibe una película mediante `pelicula` y muestra su cartel, título, sinopsis, clasificación, valoración y horarios, con un enlace a la cartelera.
8. MovieCard conserva la tarjeta existente, adaptada al nombre solicitado. Sus datos proceden de la prop `pelicula`.
9. MovieList conserva el listado existente, adaptado al nombre solicitado. Recorre `peliculas` con `map` y usa `key={pelicula.id}`. Los horarios también tienen claves.
10. App integra Header, Hero, MovieList y Footer. La primera película del arreglo se utiliza como destacada.
11. Los tres problemas intencionales se reproducen en memoria con `npm run errores`. El script comprueba el mensaje de cada problema y verifica su corrección; no introduce errores en la aplicación.
12. El documento y la entrega al campus quedan pendientes. Los cambios de la segunda parte están preparados en commits locales; la subida a GitHub requiere conexión al remoto.

## Alcance

Cartelera informativa, sin venta ni reserva de entradas. Diseño adaptable a una, dos o cuatro columnas. No usa API, fuentes ni imágenes externas.

## Validación registrada en la primera parte

- `npm run build` y `npm run lint`: correctos, sin advertencias.
- Datos: ocho IDs únicos; campos obligatorios completos, imágenes locales existentes, valoraciones entre 0 y 5 y horarios válidos.
- Navegador: Header comprobado antes de Footer; navegación a cartelera y contacto; ocho imágenes cargadas y sin desbordamiento horizontal en escritorio.

## Verificación de la segunda parte

```sh
npm test -- --registrar
npm run errores -- --registrar
npm run build
```

Las primeras dos órdenes guardan los resultados en `evidencias/verificacion.txt` y `evidencias/errores-comunes.txt`. Las pruebas verifican los datos, el cambio de contenido mediante props, las tarjetas, la lista vacía, la composición de App, los destinos de navegación, los identificadores accesibles y la ausencia de advertencias de React.

En esta revisión se usaron Node v24.22.0, React 19.3.0 y Vite 8.3.4 recuperados de la caché local. Pasaron la compilación, las seis comprobaciones de componentes y datos y la reproducción de los tres problemas con sus correcciones. No se modificaron las versiones declaradas ni el lockfile. La instalación de sus versiones exactas quedó bloqueada por un error DNS al acceder a npm; `npm run lint` no pudo ejecutarse porque oxlint no estaba disponible en la caché.

El entorno impidió abrir el puerto del servidor de desarrollo. La revisión visual se hizo en Chrome con una copia temporal del bundle de producción con estilos y carteles embebidos. Esta comprobación no sustituye la ejecución con `npm run dev` en un entorno que permita abrir el puerto.
