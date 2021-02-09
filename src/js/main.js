'use strict';

const inputElement = document.querySelector('.js-input');
const buttonElement = document.querySelector('.js-button');
const showContainer = document.querySelector('.js-show-container');
const formElement = document.querySelector('.js-form');
const favoriteContainer = document.querySelector('.js-favorite-container');

let resultShows = [];
let favoriteShows = [];

//get data from api

function searchSeries() {
  const userInput = inputElement.value.toUpperCase();
  fetch('http://api.tvmaze.com/search/shows?q=' + userInput)
    .then((response) => response.json())
    .then((data) => {
      resultShows = data;
      //console.log(resultShows);
      paintShows();
    });
}

//paint searchResult

function paintShows() {
  let htmlCode = '';
  for (const shows of resultShows) {
    const showName = shows.show.name.toUpperCase();
    const showImage = shows.show.image;
    const showID = shows.show.id;
    //console.log(showID);
    let isFavoriteClass;
    if (isFavoriteShow(shows)) {
      isFavoriteClass = 'list__element--favorite';
    } else {
      isFavoriteClass = '';
    }
    htmlCode += `<li class="list__element js-container ${isFavoriteClass}" id="${showID}">`;
    let source;
    if (showImage === null) {
      source = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      source = `${showImage.original}`;
    }
    htmlCode += `<img class="list__element--image" src="${source}" alt="poster of series" />`;
    htmlCode += `<h2>${showName}</h2>`;
    htmlCode += '</li>';
  }
  showContainer.innerHTML = htmlCode;
  listenContainerElement();
}

function isFavoriteShow(shows) {
  const favoriteFound = favoriteShows.find(function (favoriteShow) {
    const favShow = favoriteShow.show;
    //console.log(favShow);
    const show = shows.show;
    return favShow.id === show.id;
  });
  //console.log(favoriteFound);
  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}

buttonElement.addEventListener('click', searchSeries);

//listen containerElements

function listenContainerElement() {
  //listen click container div (incl. name and image) with querySelectorAll, have to listen to events after they have been created (after innerHTML)
  const containerElements = document.querySelectorAll('.js-container');
  //to every containerElement add addEventListener
  for (const containerElement of containerElements) {
    //console.log(containerElement);
    containerElement.addEventListener('click', handleShow);
  }
  //console.log(containerElements);
}

function handleShow(ev) {
  const clickedShowId = ev.currentTarget.id;
  //console.log('clicked', clickedShowId);
  /*   let resultShows = [];
let favoriteShows = []; */
  /*  for (const shows of resultShows) {
    console.log(shows.show.id);
    if (shows.show.id == clickedShowId) {
      console.log('Hola');
    }
    console.log(favoriteShows);
  } */
  const showFound = resultShows.find(function (shows) {
    const showId = shows.show.id;
    //console.log(show);
    //console.log(showId);
    return showId == clickedShowId;
  });
  //console.log('Finally', showFound);
  favoriteShows.push(showFound);
  //console.log(favoriteShows);
  paintShows();
  //push: need show
  //splice need index

  //paint favorite series

  function paintfavorites() {
    let htmlCode = '';
    for (const favoriteShow of favoriteShows) {
      console.log(favoriteShow.show.name);
      const favShowName = favoriteShow.show.name;
      const favshowImage = favoriteShow.show.image;
      htmlCode += `<li class="fav-show">`;
      htmlCode += `<img class="fav-show--image" src="${favshowImage.original}" alt="poster of series" />`;
      htmlCode += `<h4>${favShowName}</h4>`;
      htmlCode += '</li>';
    }
    favoriteContainer.innerHTML = htmlCode;
  }

  paintfavorites();
}

//submit form

function handleForm(ev) {
  ev.preventDefault();
}

formElement.addEventListener('submit', handleForm);
