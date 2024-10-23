console.log("Connected");



// https://dog.ceo/api/breeds/list/all = All breed
// https://dog.ceo/api/breed/Affenpinscher/images/random = single image

const selectEl = document.querySelector("select");

// API
const BASE_URL = `https://dog.ceo/api/`;


function getDogBreed() {
 return fetch(`${BASE_URL}breeds/list/all`)
.then((res) => res.json())
.then((data) => {
    // console.log(Object.keys(data.message));
    return Object.keys(data.message);
    
})
.catch((error) => console.log(error));
}


function renderOptiins() {
    getDogBreed().then((data) => {
        const fragment = document.createDocumentFragment();
        for(let breed of data){
            const option = document.createElement("option");
            option.textContent = breed;
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