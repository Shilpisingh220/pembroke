import {capitalize} from "./utils"



// https://dog.ceo/api/breeds/list/all = All breed
// https://dog.ceo/api/breed/Affenpinscher/images/random = single image

const selectEl = document.querySelector("select");
const imgE1 = document.querySelector("img");

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

function getSingleImage(breed) {
    return fetch(`${BASE_URL}breed/${breed}/images/random`)
    .then((res) => res.json())
    .then((data) => (data.message))
    .catch((error) => console.log(error));
}

// getSingleImage("husky");

// MARK: RENDER
function renderOptiins() {
    getDogBreed().then((data) => {
        const fragment = document.createDocumentFragment();
        for(let breed of data){
            const option = document.createElement("option");
            option.textContent = capitalize(breed);
            option.value = breed;
            fragment.appendChild(option);
        }
        selectEl.appendChild(fragment);
    });

}

renderOptiins();

// Promise
// .then()
// .then()
// .then()
// .catch()

// CHANGE ON USER SELECT
selectEl.addEventListener("change", (event) => {
    getSingleImage(event.target.value).then((data) => {
        imgE1.src = data;
    });
});