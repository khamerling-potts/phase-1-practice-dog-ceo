console.log("%c HI", "color: firebrick");
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
fetchImages();
fetchBreeds(); //initial display of all breeds when page loads

//fetch dog images and append to DOM
function fetchImages() {
  fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
      const imagesArray = data.message;
      imagesArray.forEach(addPicture);
    });
}

function addPicture(picture) {
  const img = document.createElement("img");
  img.src = picture;
  document.getElementById("dog-image-container").appendChild(img);
}

//fetch dog breeds and add to DOM list
function fetchBreeds(startingLetter = "none") {
  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      const breedsObject = data.message;
      for (breed in breedsObject) {
        if (startingLetter === "none") {
          addBreed(breed);
        } else if (startingLetter === breed[0]) {
          addBreed(breed);
        }
      }
    });
}

function addBreed(breed) {
  const li = document.createElement("li");
  li.innerText = breed;
  //change color when clicked
  li.addEventListener("click", (event) => (event.target.style.color = "pink"));
  document.getElementById("dog-breeds").appendChild(li);
}

//only display breeds that start with chosen dropdown letter
document
  .getElementById("breed-dropdown")
  .addEventListener("change", filterBreeds);

function filterBreeds(event) {
  //remove current dog breeds from screen to start from scratch
  document.getElementById("dog-breeds").innerHTML = "";
  const startingLetter = event.target.value;
  fetchBreeds(startingLetter);
}
