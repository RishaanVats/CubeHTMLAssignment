// Data source: perfume image entries (id, address, alt)
const images = {
    0: {
        alt: "Main bottle of perfume",
        address: "./assets/mainPerfume.webp",
    },
    1: {
        alt: "Two bottles of oils",
        address: "./assets/thumbnails/pexels-pixabay-1.webp",
    },
    2: {
        alt: "One bottle of essential oil",
        address: "./assets/thumbnails/pexels-pixabay-2.webp",
    },
    3: {
        alt: "Bottles of oils with a diffuser",
        address: "./assets/thumbnails/pexels-pixabay-3.webp",
    },
    4: {
        alt: "Bottle of oil with flowers",
        address: "./assets/thumbnails/pexels-pixabay-4.webp",
    },
    5: {
        alt: "Two bottles of oils",
        address: "./assets/thumbnails/pexels-pixabay-1 a.webp",
    },
    6: {
        alt: "One bottle of essential oil",
        address: "./assets/thumbnails/pexels-pixabay-2 a.webp",
    },
    7: {
        alt: "Bottles of oils with a diffuser",
        address: "./assets/thumbnails/pexels-pixabay-3 a.webp",
    },
};

var mainImg = document.getElementById("mainImg");// ready to set the main image
var imgSet = { id: "", src: "", alt: "" }; // Current main image tracking

//Setting the default main image ------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    // Code to run when the DOM is ready
    console.log("DOM fully loaded and parsed");
    setMainImg(0);
});

setDots();
renderThumbnails();

// Render all the thumbnails dynamically ------------------------------------------------------------------------
function renderThumbnails() {
    let thumbnailsHTML = "";
    Object.entries(images).forEach(([Id, element]) => {
        const thumb = `<img id="image-${Id}" src="${element.address}" alt="${element.alt}" />`;
        thumbnailsHTML += thumb;
    });
    document.getElementById("thumbnailImages").innerHTML = thumbnailsHTML;
}

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

let lastImgId = 0;
let sequentialChange; // Declared outside for reference.
function setMainImg(id) {
    const mainImg = document.getElementById("mainImg");

    (sequentialChange) ? clearInterval(sequentialChange) : "";

    id = Number(id);

    imgSet = { id: id, src: images[id].address, alt: images[id].alt };

    console.log(imgSet);
    mainImg.src = imgSet.src;
    mainImg.alt = imgSet.alt;

    document.getElementById(`image-${lastImgId}`).classList.remove('thumbnailCurrent');
    // Set border and padding of only the main image's thumbnail 
    document.getElementById(`image-${id}`).classList.add('thumbnailCurrent');
    lastImgId = id;
    setDots();

    sequentialChange = setInterval(() => {
        if (imgSet.id >= 0 && imgSet.id < (Object.keys(images).length - 1)) {
            setMainImg(imgSet.id + 1);
            console.info("changing main image");
        } else {
            setMainImg("0");
            console.info("changing main image to Original");
        }
    }, 5000);

}

var leftArrow = document.getElementById("leftArrow");
leftArrow.addEventListener("click", () => {
    if (imgSet.id == 0) {
        setMainImg((Object.keys(images).length - 1));
    } else {
        setMainImg(imgSet.id - 1);
    }
});

var rightArrow = document.getElementById("rightArrow");
rightArrow.addEventListener("click", () => {
    if (imgSet.id == (Object.keys(images).length - 1)) {
        setMainImg(0);
    } else {
        setMainImg(imgSet.id + 1);
    }
});

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
        setMainImg(numId);
        setDots();
    });

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
        setMainImg(numId);
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

// Ribbon Section Code ----------------------------------------------------------------------------------------------
const counters = document.querySelectorAll(".dataStats");

function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1200; // ms
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target) + "%";
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // run once
            }
        });
    },
    { threshold: 0.5 },
);

counters.forEach((el) => observer.observe(el));

// Most popular order section code ----------------------------------------------------------------------------------------
const radios = document.querySelectorAll('input[name="subscription"]');
const boxes = document.querySelectorAll(".formRadio");

function expandSection(el) {
    el.style.height = el.scrollHeight + "px";
}

function collapseSection(el) {
    el.style.height = "0px";
}

window.addEventListener("DOMContentLoaded", () => {
    // Select first by default
    radios[0].click();
    // radios[0].checked = true;
    // boxes[0].classList.add('expanded');
    // expandSection(boxes[0].querySelector('.subscriptionBody'));
});

radios.forEach((radio) => {
    radio.addEventListener("click", () => {
        // Collapse all
        boxes.forEach((box) => {
            box.classList.remove("expanded");
            collapseSection(box.querySelector(".subscriptionBody"));
        });

        // Expand selected
        const selectedBox = radio.closest(".formRadio");
        selectedBox.classList.add("expanded");
        expandSection(selectedBox.querySelector(".subscriptionBody"));
    });
});

// Add to Cart Section ------------------------------------------------------------------------------------------

document.getElementById("addToCartBtn").addEventListener("click", addToCart);

function addToCart() {
    const subscriptionType = document.querySelector(
        'input[name="subscription"]:checked',
    ).value;

    const fragranceType = document.querySelector(
        'input[name="fragrance"]:checked',
    ).value;
    const fragranceType1 = document.querySelector(
        'input[name="fragrance1"]:checked',
    ).value;
    const fragranceType2 = document.querySelector(
        'input[name="fragrance2"]:checked',
    ).value;

    let newHref = `https://example.com/add?type=subscription&subscription=${subscriptionType}&item=perfume&`;

    if (subscriptionType === "Single Subscription") {
        newHref += `fragrance=${fragranceType}`;
        console.log(
            `Added to cart: Subscription - ${subscriptionType}, Fragrance - ${fragranceType}`,
            newHref,
        );
        // alert(`Added to cart: Subscription - ${subscriptionType}, Fragrance - ${fragranceType}`);
    } else if (subscriptionType === "Double Subscription") {
        newHref += `fragrance=${fragranceType1}&fragrance=${fragranceType2}`;
        console.log(
            `Added to cart: Subscription - ${subscriptionType}, Fragrance 1 - ${fragranceType1}, Fragrance 2 - ${fragranceType2}`,
            newHref,
        );
        // alert(`Added to cart: Subscription - ${subscriptionType}, Fragrance 1 - ${fragranceType1}, Fragrance 2 - ${fragranceType2}`);
    }

    const cartLink = document.getElementById("addToCart");
    cartLink.setAttribute("href", newHref);
}

// For updating the year in footer credit
document.getElementById("year").textContent = new Date().getFullYear();
