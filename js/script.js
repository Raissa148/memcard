const cards = document.querySelectorAll(".card");


const movesDisplay = document.getElementById("moves");
const themeToggleButton = document.getElementById("theme-toggle");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let moves = 0; 


const THEME_KEY = "memoryGameTheme";


const cardImages = [
    "img/hachi.jpg",
    "img/nana.jpg",
    "img/nobu.jpg",
    "img/reira.jpg",
    "img/takumi.jpg",
    "img/shin.jpg",
    "img/yasushi.jpg",
    "img/ren.jpg"
];
function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true; 
        moves++;
        movesDisplay.textContent = moves;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched === cardImages.length) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    moves = 0;                       
    movesDisplay.textContent = moves;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [...cardImages, ...cardImages];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = arr[i];
        card.addEventListener("click", flipCard);
    });
}

function applyTheme(themeName) {
    const isNana = themeName === "nana";
    document.body.classList.toggle("theme-nana", isNana);
    themeToggleButton.textContent = isNana ? "Tema Hachi" : "Tema Nana";
    localStorage.setItem(THEME_KEY, themeName);
}

themeToggleButton.addEventListener("click", () => {
    const isNanaActive = document.body.classList.contains("theme-nana");
    applyTheme(isNanaActive ? "hachi" : "nana");
});


applyTheme(localStorage.getItem(THEME_KEY) || "hachi");
shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});