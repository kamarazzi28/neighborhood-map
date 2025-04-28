/*
// 1. Data about cats
const cats = [
    {name: "Fluffy", imgSrc: "images/cat1.png", clicks: 0},
    {name: "Mittens", imgSrc: "images/cat2.png", clicks: 0},
    {name: "Tiger", imgSrc: "images/cat3.png", clicks: 0},
    {name: "Shadow", imgSrc: "images/cat4.png", clicks: 0},
    {name: "Smokey", imgSrc: "images/cat5.png", clicks: 0}
];

// 2. Get elements
const catListElem = document.getElementById('cat-list');
const catNameElem = document.getElementById('cat-name');
const catImgElem = document.getElementById('cat-img');
const catClicksElem = document.getElementById('cat-clicks');

let currentCat = null;

// 3. Create list of cat names
cats.forEach((cat, index) => {
    const btn = document.createElement('button');
    btn.textContent = cat.name;
    btn.style.margin = "5px";

    btn.addEventListener('click', () => {
        currentCat = cat;
        updateCatDisplay();
    });

    catListElem.appendChild(btn);
});

// 4. When clicking on cat image, increase click count
catImgElem.addEventListener('click', () => {
    if (currentCat) {
        currentCat.clicks++;
        catClicksElem.textContent = currentCat.clicks;
    }
});

// 5. Function to update display
function updateCatDisplay() {
    catNameElem.textContent = currentCat.name;
    catImgElem.src = currentCat.imgSrc;
    catClicksElem.textContent = currentCat.clicks;
}
*/

// Cat data
const cats = [
    {name: "Fluffy", imgSrc: "images/cat1.png", clicks: 0},
    {name: "Mittens", imgSrc: "images/cat2.png", clicks: 0},
    {name: "Tiger", imgSrc: "images/cat3.png", clicks: 0},
    {name: "Shadow", imgSrc: "images/cat4.png", clicks: 0},
    {name: "Smokey", imgSrc: "images/cat5.png", clicks: 0}
];

// Get HTML elements
const catListElem = document.getElementById('cat-list');
const catNameElem = document.getElementById('cat-name');
const catImgElem = document.getElementById('cat-img');
const catClicksElem = document.getElementById('cat-clicks');

let currentCat = null;

// Create cat name list with event listeners
cats.forEach(function (cat) {
    const btn = document.createElement('button');
    btn.textContent = cat.name;
    btn.style.margin = "5px";

    // Closure: capture this cat
    btn.addEventListener('click', (function (catCopy) {
        return function () {
            currentCat = catCopy;
            updateCatDisplay();
        };
    })(cat));

    catListElem.appendChild(btn);
});

// Cat image click to increase clicks
catImgElem.addEventListener('click', function () {
    if (currentCat) {
        currentCat.clicks++;
        catClicksElem.textContent = currentCat.clicks;
    }
});

// Update display function
function updateCatDisplay() {
    catNameElem.textContent = currentCat.name;
    catImgElem.src = currentCat.imgSrc;
    catClicksElem.textContent = currentCat.clicks;
}
