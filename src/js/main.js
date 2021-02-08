'use strict';

const inputElement = document.querySelector('.js-input');
const buttonElement = document.querySelector('.js-button');
const showContainer = document.querySelector('.js-show-container');
const formElement = document.querySelector('.js-form');

let resultShows = [];

//get data from api

function searchSeries() {
  fetch('http://api.tvmaze.com/search/shows?q=' + inputElement.value)
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
    //console.log(shows);
    const showName = shows.show.name;
    const showImage = shows.show.image.original;
    //console.log(showName);

    const userInput = inputElement.value;
    //console.log(userInput);

    htmlCode += '<li class="list__element">';
    //console.log(showName.includes(userInput));
    if (showName.includes(userInput)) {
      //console.log('I am in');
      htmlCode += `<img class="list__element--image" src="${showImage}" alt="poster of series" />`;
      htmlCode += `<h2>${showName}</h2>`;
    }
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
