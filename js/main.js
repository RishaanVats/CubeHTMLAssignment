// Data source: perfume image entries (id, address, alt)
const images = {
    0: {
        alt: "Main bottle of perfume",
        address: "./assets/mainPerfume.png",
    },
    1: {
        alt: "Two bottles of oils",
        address: "./assets/thumbnails/pexels-pixabay-1.svg",
    },
    2: {
        alt: "One bottle of essential oil",
        address: "./assets/thumbnails/pexels-pixabay-2.svg",
    },
    3: {
        alt: "Bottles of oils with a diffuser",
        address: "./assets/thumbnails/pexels-pixabay-3.svg",
    },
    4: {
        alt: "Bottle of oil with flowers",
        address: "./assets/thumbnails/pexels-pixabay-4.svg",
    },
    5: {
        alt: "Two bottles of oils",
        address: "./assets/thumbnails/pexels-pixabay-1a.svg",
    },
    6: {
        alt: "One bottle of essential oil",
        address: "./assets/thumbnails/pexels-pixabay-2a.svg",
    },
    7: {
        alt: "Bottles of oils with a diffuser",
        address: "./assets/thumbnails/pexels-pixabay-3a.svg",
    },
};

var mainImg = document.getElementById("mainImg"); // ready to set the main image
var imgSet = { id: "", src: "", alt: "" }; // Current main image tracking

//Setting the default main image
imgSet = { id: "0", src: images[0].address, alt: images[0].alt };
mainImg.src = images[0].address;
mainImg.alt = images[0].alt;
setDots();

function setMainImage(id, move) {
    if (!move) {
        move = "N/A";
    }
    id = Number(id);

    if (move === "left") {
        id = id === 0 ? 7 : id - 1;
    } else if (move === "right") {
        id = id === 7 ? 0 : id + 1;
    }
    imgSet = { id: id, src: images[id].address, alt: images[id].alt };
    mainImg.src = imgSet.src;
    mainImg.alt = imgSet.alt;
    setDots();
}

// Render all the thumbnails dynamically
let thumbnailsHTML = "";
Object.entries(images).forEach(([Id, element]) => {
    const thumb = `<img id="image-${Id}" src="${element.address}" alt="${element.alt}" />`;
    thumbnailsHTML += thumb;
});
document.getElementById("thumbnailImages").innerHTML = thumbnailsHTML;

function setDots() {
    // Render all the dots dynamically
    let dotsHTML = "";
    Object.entries(images).forEach(([Id]) => {
        if (Number(Id) === Number(imgSet.id)) {
            var dots = `<img id="dot-${Id}" src="./assets/icons/Dot.png" alt="Dot of selected Image" />`;
        } else {
            var dots = `<img id="dot-${Id}" src="./assets/icons/Dot-1.png" alt="Dot of an Image" />`;
        }
        dotsHTML += dots;
    });
    document.getElementById("dotIndicators").innerHTML = dotsHTML;
}

// Listen to the clicks on the thumbnails and then set them as the main Image.
document
    .getElementById("thumbnailImages")
    .addEventListener("click", function (event) {
        const clickedOn = event.target;
        const id = clickedOn.id;
        let numId = id.split("-")[1];
        if (clickedOn.tagName === "IMG") {
            mainImg.src = images[numId].address;
            mainImg.alt = images[numId].alt;
            imgSet = {
                id: numId,
                src: images[numId].address,
                alt: images[numId].alt,
            };
        }
        setDots();
    });

// Listen to the clicks on the dots and then set them as the main Image.
document
    .getElementById("dotIndicators")
    .addEventListener("click", function (event) {
        const clickedOn = event.target;
        const id = clickedOn.id;
        let numId = id.split("-")[1];
        if (clickedOn.tagName === "IMG") {
            mainImg.src = images[numId].address;
            mainImg.alt = images[numId].alt;
            imgSet = {
                id: numId,
                src: images[numId].address,
                alt: images[numId].alt,
            };
        }
        setDots();
    });

// When the user clicks on the button, toggle between hiding and showing the dropdown content
// Hamburger Menu Click and animate
const burger = document.querySelector(".containerHam");
const dropdown = document.getElementById("menuDropdown");

function hamburgerSwitch(ele) {
    ele.classList.toggle("change");
    ele.setAttribute("aria-expanded", ele.classList.contains("change"));
    dropdown.classList.toggle("show");
}

window.onclick = (e) => {
    if (!e.target.closest(".containerHam")) {
        dropdown.classList.remove("show");
        burger.classList.remove("change");
        burger.setAttribute("aria-expanded", "false");
    }
};


var leftArrow = document.getElementById("leftArrow");
leftArrow.addEventListener("click", () => setMainImage(imgSet.id, "left"));

var rightArrow = document.getElementById("rightArrow");
rightArrow.addEventListener("click", () => setMainImage(imgSet.id, "right"));


// Ribbon Section Code --------------------------------------------------

const counters = document.querySelectorAll('.dataStats');

function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1200; // ms
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target) + '%';
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target); // run once
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => observer.observe(el));

// Most popular order section code ------------------------------------------------
const radios = document.querySelectorAll('input[name="subscription"]');
const boxes = document.querySelectorAll('.formRadio');

function expandSection(el) {
    el.style.height = el.scrollHeight + 'px';
}

function collapseSection(el) {
    el.style.height = '0px';
}

window.addEventListener('DOMContentLoaded', () => {
    // Select first by default
    radios[0].click();
    // radios[0].checked = true;
    // boxes[0].classList.add('expanded');
    // expandSection(boxes[0].querySelector('.subscriptionBody'));
});

radios.forEach(radio => {
    radio.addEventListener('click', () => {

        // Collapse all
        boxes.forEach(box => {
            box.classList.remove('expanded');
            collapseSection(box.querySelector('.subscriptionBody'));
        });

        // Expand selected
        const selectedBox = radio.closest('.formRadio');
        selectedBox.classList.add('expanded');
        expandSection(selectedBox.querySelector('.subscriptionBody'));
    });
});

// Add to Cart Section ------------------------------------------------

document.getElementById("addToCartBtn").addEventListener("click", addToCart);

function addToCart() {
    const subscriptionType = document.querySelector('input[name="subscription"]:checked').value;

    const fragranceType = document.querySelector('input[name="fragrance"]:checked').value;
    const fragranceType1 = document.querySelector('input[name="fragrance1"]:checked').value;
    const fragranceType2 = document.querySelector('input[name="fragrance2"]:checked').value;

    let newHref = `https://example.com/add?type=subscription&subscription=${subscriptionType}&item=perfume&`;

    if (subscriptionType === "Single Subscription") {
        newHref += `fragrance=${fragranceType}`;
        console.log(`Added to cart: Subscription - ${subscriptionType}, Fragrance - ${fragranceType}`, newHref);
        // alert(`Added to cart: Subscription - ${subscriptionType}, Fragrance - ${fragranceType}`);
    } else if (subscriptionType === "Double Subscription") {
        newHref += `fragrance=${fragranceType1}&fragrance=${fragranceType2}`;
        console.log(`Added to cart: Subscription - ${subscriptionType}, Fragrance 1 - ${fragranceType1}, Fragrance 2 - ${fragranceType2}`, newHref);
        // alert(`Added to cart: Subscription - ${subscriptionType}, Fragrance 1 - ${fragranceType1}, Fragrance 2 - ${fragranceType2}`);
    }

    const cartLink = document.getElementById('addToCart');
    cartLink.setAttribute('href', newHref);
}

// For updating the year in footer credit
document.getElementById("year").textContent = new Date().getFullYear();

// Add an event listener for the 'resize' event testing

// const currentWidth = window.innerWidth;
// console.log("Window width:", currentWidth, "px");
// window.addEventListener('resize', function () {
//     const currentWidth = window.innerWidth;
//     console.log("Window width:", currentWidth, "px");

//     // Optional: display the width on the page
//     const widthOutput = document.querySelector("body");
//     console.log("Body width: ", widthOutput.clientWidth, 'px');
// });
