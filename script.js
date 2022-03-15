const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "wMNtfWGe9k2kpvB_PBZwo-yuzKl73v-0aMCmqVizpj4";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper Function to Set Attributes on DOM Emts
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
  imagesLaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  // Run f() for each obj in the arr
  photosArray.forEach((photo) => {
    //   Create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // open in a new window
    // item.setAttribute("target", "_blank");
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.location.title,
    });
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    // Event Listner, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Elmt
    item.appendChild(img);
    // putting all of these into the <div id="image-container"> which has css properties
    imageContainer.appendChild(item);
  });
}

// Get photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

//Check to see if scrolling near bottom of page, load more imgs

// window is the parent of the document and the grandparent of the body
// represents the entire browser window
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
//On Load
getPhotos();
