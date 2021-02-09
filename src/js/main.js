'use strict';

const inputElement = document.querySelector('.js-input');
const buttonElement = document.querySelector('.js-button');
const showContainer = document.querySelector('.js-show-container');
const formElement = document.querySelector('.js-form');

let resultShows = [];

//get data from api

function searchSeries() {
  const userInput = inputElement.value.toUpperCase();
  fetch('http://api.tvmaze.com/search/shows?q=' + userInput)
    .then((response) => response.json())
    .then((data) => {
      resultShows = data;
      console.log(resultShows);
      paintShows();
    });
}

//paint searchResult

function paintShows() {
  let htmlCode = '';
  for (const shows of resultShows) {
    const showName = shows.show.name.toUpperCase();
    const showImage = shows.show.image;

    htmlCode += '<li class="list__element">';
    htmlCode += '<div class="list__element--container">';
    if (showImage === null) {
      htmlCode +=
        '<img class="list__element--image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="poster of series is missing" />';
      htmlCode += `<h2>${showName}</h2>`;
    } else {
      htmlCode += `<img class="list__element--image" src="${showImage.original}" alt="poster of series" />`;
      htmlCode += `<h2>${showName}</h2>`;
    }
    htmlCode += '<div>';
    htmlCode += '</li>';
    showContainer.innerHTML = htmlCode;
  }
}

buttonElement.addEventListener('click', searchSeries);

//submit form

function handleForm(ev) {
  ev.preventDefault();
}

formElement.addEventListener('submit', handleForm);
