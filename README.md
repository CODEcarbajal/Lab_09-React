# Cine Aurora · Laboratorio 09

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
