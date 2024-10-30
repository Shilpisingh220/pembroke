import Carousel from "./components/Carousel";
import { capitalize } from "./utils";

// https://dog.ceo/api/breeds/list/all = All breed
// https://dog.ceo/api/breed/Affenpinscher/images/random = single image

const selectEl = document.querySelector("select");
const carouselContainerEl = document.querySelector(".carousel-inner");

// API
const BASE_URL = `https://dog.ceo/api/`;

// MARK: FETCH
function getDogBreed() {
  return fetch(`${BASE_URL}breeds/list/all`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(Object.keys(data.message));
      return Object.keys(data.message);
    })
    .catch((error) => console.log(error));
}

// Gets images on breed
function getBreedImages(breed) {
  return fetch(`${BASE_URL}breed/${breed}/images`)
    .then((res) => res.json())
    .then((data) => data.message.slice(0, 10))
    .catch((error) => console.log(error));
}

// getBreedImages("husky");

// MARK: RENDER
function renderOptions() {
  getDogBreed().then((data) => {
    const fragment = document.createDocumentFragment();
    for (let breed of data) {
      const option = document.createElement("option");
      option.textContent = capitalize(breed);
      option.value = breed;
      fragment.appendChild(option);
    }
    selectEl.appendChild(fragment);
  });
}

// Promise
// .then()
// .then()
// .then()
// .catch()

function renderCarousel(breed) {
  carouselContainerEl.appendChild(Carousel(["loader.gif"], "Loading..."));

  getBreedImages(breed).then((images) => {
    carouselContainerEl.innerHTML = "";
    const carousel = Carousel(images, breed);
    carouselContainerEl.appendChild(carousel);
  });
}

// CHANGE ON USER SELECT
selectEl.addEventListener("change", (event) => {
  renderCarousel(event.target.value);
});

renderOptions();
renderCarousel("affenpinscher");
