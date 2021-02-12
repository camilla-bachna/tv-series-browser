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
      paintShows();
    });
}

//paint search result

function paintShows() {
  let htmlCode = '';
  for (const shows of resultShows) {
    const showName = shows.show.name.toUpperCase();
    const showImage = shows.show.image;
    const showID = shows.show.id;
    let isFavoriteClass;
    if (isFavoriteShow(shows)) {
      isFavoriteClass = 'container__list--favorite';
    } else {
      isFavoriteClass = '';
    }
    htmlCode += `<li class="container__list js-container ${isFavoriteClass}" id="${showID}">`;
    let source;
    if (showImage === null) {
      source = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      source = `${showImage.original}`;
    }
    htmlCode += `<img class="container__list--image" src="${source}" alt="poster of series" />`;
    htmlCode += `<h2>${showName}</h2>`;
    htmlCode += `<h3>${shows.show.genres}</h3>`;
    htmlCode += '</li>';
  }
  showContainer.innerHTML = htmlCode;
  listenContainerElement();
}

//favorite show

function isFavoriteShow(shows) {
  const favoriteFound = favoriteShows.find(function (favoriteShow) {
    const favShow = favoriteShow.show;
    const show = shows.show;
    return favShow.id === show.id;
  });
  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}

buttonElement.addEventListener('click', searchSeries);

//listen containerElements

function listenContainerElement() {
  //listen click container div, listen to events after they have been created (after innerHTML)
  const containerElements = document.querySelectorAll('.js-container');
  //to every containerElement add addEventListener
  for (const containerElement of containerElements) {
    containerElement.addEventListener('click', handleShow);
  }
}

function handleShow() {
  for (const shows of resultShows) {
    console.log(shows.show.name);
  }
}

//paint favorite series

function paintfavorites() {
  let htmlCode = '';

  for (const favoriteShow of favoriteShows) {
    const favShowName = favoriteShow.show.name;
    const favshowImage = favoriteShow.show.image;
    const favshowId = favoriteShow.show.id;
    htmlCode += `<li class="favorites__list">`;
    let source;
    if (favshowImage === null) {
      source = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      source = `${favshowImage.original}`;
    }
    htmlCode += `<img class="favorites__list--image" src="${source}" alt="poster of favorite series" />`;

    htmlCode += `<h4 class="favorites__list--title">${favShowName}</h4>`;
    htmlCode += '</li>';
    htmlCode += `<div class="favorites__list--x js-x" id="${favshowId}">x`;
    htmlCode += `</div>`;
  }
  favoriteContainer.innerHTML = htmlCode;
  storeLocalStorage();
  listenContainerElementX();
}

//submit form

function handleForm(ev) {
  ev.preventDefault();
}

formElement.addEventListener('submit', handleForm);

//local storage

function storeLocalStorage() {
  const stringfavoriteShows = JSON.stringify(favoriteShows);
  localStorage.setItem('favoriteShowsSaved', stringfavoriteShows);
}

function getLocalStorageShows() {
  const localStorageShows = localStorage.getItem('favoriteShowsSaved');
  if (localStorageShows !== null) {
    const arrayShows = JSON.parse(localStorageShows);
    favoriteShows = arrayShows;
    paintfavorites();
  }
}

getLocalStorageShows();

//reset all

const resetButton = document.querySelector('.js-reset-button');

function resetAll() {
  localStorage.removeItem('favoriteShowsSaved');
  favoriteShows = [];
  paintfavorites();
  paintShows();
}

resetButton.addEventListener('click', resetAll);

// click x

function handleX(ev) {
  const xfavoriteElementId = parseInt(ev.currentTarget.id);
  const favoriteX = favoriteShows.findIndex(function (favoriteShow) {
    const favoriteShowId = favoriteShow.show.id;
    return favoriteShowId === xfavoriteElementId;
  });
  if (favoriteX !== -1) {
    //splice
    favoriteShows.splice(favoriteX, 1);
    paintfavorites();
    paintShows();
  }
}

function listenContainerElementX() {
  const xElements = document.querySelectorAll('.js-x');
  for (const xElement of xElements) {
    xElement.addEventListener('click', handleX);
  }
}
