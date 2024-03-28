const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//array
const items = [
{name:"abelha", image:"abelha.png"},
{name:"arara", image:"arara.png"},
{name:"borboleta", image:"borboleta.png"},
{name:"cachorro", image:"cachorro.png"},
{name:"carcara", image:"carcara.png"},
{name:"cervo", image:"cervo.png"},
{name:"cisne", image:"cisne.png"},
{name:"elefante", image:"elefante.png"},
{name:"gaivota", image:"gaivota.png"},
{name:"girafa", image:"girafa.png"},
{name:"onca", image:"onca.png"},
{name:"peixe", image:"peixe.png"},
];


//time

let seconds = 0, 
minutes= 0;

//moves and win count

let movesCount = 0, 
winCount = 0;

//timer

const timeGenerator = () => {
    seconds += 1;

    //minutes
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }


//format time before displaying

let secondsValue = seconds < 10 ? `0${seconds}` :
seconds;
let minutesValue = minutes < 10 ? `0${minutes}` : 
minutes;
timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
}

//calculating moves

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//random objects from the items array

const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];

    //initialize cardValues array
    let  cardValues = [];

    size = (size * size) /2;

    //random object Selection
    for(let i = 0; i < size; i++){
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);

        //once selected remove the object of the tempArray
        tempArray.splice(randomIndex, 1);
    } 
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues =  [...cardValues,...cardValues];

    //simple suffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i =0; i < size * size; i++){

        gameContainer.innerHTML += `<div class="card-container" data-card-value="${cardValues[i].name}"><div class= "card-before">?</div><div class="card-after"><img src="${cardValues[i].image}"class="image"/></div></div>`;
    }
    //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {

        if(!card.classList.contains("matched")){
            card.classList.add("flipped");

            if(!firstCard){
                firstCard = card;

                firstCardValue = card.getAttribute("data-card-value");
            }
            else{
                movesCounter();
    
                secondCard = card;
                let secondCardValue = card.getAttribute("data-card-value");
                if(firstCardValue == secondCardValue){
    
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");
    
                    firstCard = false;
    
                    winCount += 1;
    
                    if(winCount == Math.floor(cardValues.length / 2)){
                        result.innerHTML = `<h2>You Won!</h2><h4>Moves: ${movesCount}</h4>`;
                        stopGame();
                    }
                }
                    else{
    
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                            
                        }, 1000);
                    }
             }
        }
    });
  });
};

//Start

startButton.addEventListener("click", ()=> {
    movesCount = 0;
    seconds = 0;
    minutes = 0;

    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide")

    //start timer
    interval = setInterval(timeGenerator, 1000);

    //initial moves
    moves.innerHTML = `<span>Moves: </span> ${movesCount}`;

    initializer();
});

//stop game
stopButton.addEventListener("click",
(stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
})
);
//initialize values and func calls
const initializer = () => {
    result.innerText="";
    winCount = 0;
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
};


