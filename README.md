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
4. Ocho películas ficticias con título, cartel SVG local original, sinopsis, clasificación, valoración sobre 5 y horarios. `App → Cartelera → PeliculaCard` demuestra props y listas con claves estables. ATP significa apta para todo público; 14+ y 16+ son edades mínimas ficticias. Los horarios se muestran en formato de 24 horas.
5. Header recibe nombre y navegación mediante props. Comprobado visualmente en el navegador antes de implementar Footer; el enlace Cartelera llega a `#cartelera`.
6. Footer recibe contacto e información por props desde `src/datos/cine.js`. Contacto accesible desde Header y enlaces de regreso a cartelera e inicio. El correo usa el dominio reservado `.example`; sustituir los datos ficticios antes de usar en un cine real.

## Alcance

Cartelera informativa, sin venta ni reserva de entradas. Diseño adaptable a una, dos o cuatro columnas. No usa API, fuentes ni imágenes externas.

## Validación realizada

- `npm run build` y `npm run lint`: correctos, sin advertencias.
- Datos: ocho IDs únicos; campos obligatorios completos, imágenes locales existentes, valoraciones entre 0 y 5 y horarios válidos.
- Navegador: Header comprobado antes de Footer; navegación a cartelera y contacto; ocho imágenes cargadas y sin desbordamiento horizontal en escritorio.
