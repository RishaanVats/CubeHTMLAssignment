// Data source: perfume image entries (id, address, alt)
const images = {
    0: {
        alt: "Main bottle of perfume",
        address: "./assets/mainPerfume.png"
    },
    1: {
        alt: "Two bottles of oils",
        address: "./assets/thumbnails/pexels-pixabay-1.svg"
    },
    2: {
        alt: "One bottle of essential oil",
        address: "./assets/thumbnails/pexels-pixabay-2.svg"
    },
    3: {
        alt: "Bottles of oils with a diffuser",
        address: "./assets/thumbnails/pexels-pixabay-3.svg"
    },
    4: {
        alt: "Bottle of oil with flowers",
        address: "./assets/thumbnails/pexels-pixabay-4.svg"
    },
    5: {
        alt: "Two bottles of oils",
        address: "./assets/thumbnails/pexels-pixabay-1a.svg"
    },
    6: {
        alt: "One bottle of essential oil",
        address: "./assets/thumbnails/pexels-pixabay-2a.svg"
    },
    7: {
        alt: "Bottles of oils with a diffuser",
        address: "./assets/thumbnails/pexels-pixabay-3a.svg"
    }
};

let mainImg = document.getElementById("mainImg"); // ready to set the main image
//Setting the default main image
if (!mainImg.src) { mainImg.src = images[0].address; mainImg.alt = images[0].alt; }

// Render all the thumbnails dynamically
let thumbnailsHTML = "";
Object.entries(images).forEach(([Id, element]) => {
    const thumb = `<img id="image-${Id}" src=${element.address} alt=${element.alt} />`
    thumbnailsHTML += thumb;
});
document.getElementById("thumbnailImages").innerHTML = thumbnailsHTML;

// Listen to the clicks on the thumbnails and then set them as the main Image.
document.getElementById("thumbnailImages").addEventListener("click", function (event) {
    const clickedOn = event.target;
    console.log(clickedOn.tagName);
    const id = clickedOn.id;
    let numId = id.split("-")[1];
    if (clickedOn.tagName === "IMG") {
        mainImg.src = images[numId].address;
        mainImg.alt = images[numId].alt;
    }
});