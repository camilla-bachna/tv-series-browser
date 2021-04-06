# TV series browser 🔎

![Search](/src/images/Browser_Search.png)

Este ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite
des/marcar las series como favoritas y guardarlas en local storage.

## Cómo lo he creado:

Con una equilibrada mezcla de HTML, CSS, JavaScript y API. Gracias al Starter Kit de Adalab, me he valido de gulp, que me he permitido convertir el Sass sobre el que he trabajado en CSS.

## Descárgate el repositorio:

- Descarga el [respositorio](https://github.com/camilla-bachna/tv-series-browser.git) de GitHub.
- Abre una terminal y instala las dependencias locales ejecutando en la terminal el comando:

```bash
npm install
```

- Arranca el proyecto ejecutando el comando:

```bash
npm start
```

Se abrirá una ventana del explorador y ya podrás usar la aplicación.

## Descripción Técnica:

La aplicación de búsqueda de series consta de dos partes:

- Un campo de texto y un botón para buscar series por su título
- Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

### Búsqueda:

- Al hacer click sobre el botón "Search", la aplicación debe conectarse al [API abierto de TVMaze para búsqueda de series](https://www.tvmaze.com/api).
- Por cada show contenido en el resultado de la búsqueda pinta una tarjeta con una imagen de la serie y el título.
- Algunas de las series que devuelve el API no tienen imagen. En ese caso se mostra una imagen de relleno.

![Search Result](/src/images/Search_Result.png)

### Favoritos:

Una vez aparecen los resultados de búsqueda, el usuario puede indicar cuáles son sus series favoritas. Para ello, al hacer clic sobre una serie pasa lo siguiente:

- El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
- Se mostra un listado en la parte izquierda de la pantalla con las series favoritas.
- Las series favoritas siguen apareciendo a la izquierda aunque la usuaria realice otra búsqueda y también si el usuario recarga la página el listado de favoritos se mostra gracias al localStorage.
- Al hacer clic sobre el icono de una 'x' al lado de cada favorito, el usuario puede borrar el favorito clicado de la lista y del localStorage.

![Favorite Shows](/src/images/Favorite_Shows.png)

> **NOTA:** Si tienes alguna sugerencia o mejora: son siempre bienvenidas!

## Contacto 🖋

Si te gusta este trabajo, no dudes en **ponerte en contacto con migo**. Pincha en los enlaches para acceder a:

- [mi cuenta de LinkedIn](https://www.linkedin.com/in/camilla-bachna)
- [mi perfil de GitHub](https://github.com/camilla-bachna)

## Visita la página 💻:

Y por último, para ver la página, pincha en el siguiente enlace: [TV series browser](http://beta.adalab.es/modulo-2-evaluacion-final-camilla-bachna/ 'TV series browser').
