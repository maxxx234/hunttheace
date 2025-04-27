// index.html
// const cardObjectDefinitions = [
//     {id:1, imagePath:'card-KingHearts.png'},
//     {id:2, imagePath:'card-JackClubs.png'},
//     {id:3, imagePath:'card-QueenDiamonds.png'},
//     {id:4, imagePath:'card-AceSpades.png'}
// ];
// const aceId = 4;
// const cardBackImgPath = 'card-back-Blue.png';

// let cards = [];

// const playGameButtonElem = document.getElementById('playGame');
// const cardContainerElem = document.querySelector('.card-container');

// const collapsedGridAreaTemplate = '"a a" "a a"';
// const cardCollectionCellClass = ".card-pos-a";

// const numCards = cardObjectDefinitions.length;

// let cardPositions = [];

// let gameInProgress = false;
// let shufflingInProgress = false;
// let cardsRevealed = false;

// const currentGameStatusElem = document.querySelector('.current-status');
// const scoreContainerElem = document.querySelector('.header-score-container');
// const scoreElem = document.querySelector('.score');
// const roundContainerElem = document.querySelector('.header-round-container');
// const roundElem = document.querySelector('.round');

// const winColor = "green";
// const loseColor = "red";
// const primaryColor = "black";

// let roundNum = 0;
// let maxRounds = 4;
// let score = 0;

// let gameObj = {};

// const localStorageGameKey = "HTA";




// (utility functions)

// function createElement(elemType){
//     return document.createElement(elemType);
// }

// function addClassToElement(elem, className){
//     elem.classList.add(className);
// }

// function addIdToElement(elem, id){
//     elem.id = id;
// }

// function addSrcToImageElem(imgElem, src){
//     imgElem.src = src;
// }

// function addChildElement(parentElem, childElem){
//     parentElem.appendChild(childElem);
// }

// function updateStatusElement(elem, display, color, innerHTML){
//     elem.style.display = display;
//     if(arguments.length > 2){
//         elem.style.color = color;
//         elem.innerHTML = innerHTML;
//     }
// }

// // Local storage functions
// function getSerializedObjectAsJSON(obj){
//     return JSON.stringify(obj);
// }

// function getObjectFromJSON(json){
//     return JSON.parse(json);
// }

// function updateLocalStorageItem(key, value){
//     localStorage.setItem(key, value);
// }

// function removeLocalStorageItem(key){
//     localStorage.removeItem(key);
// }

// function getLocalStorageItemValue(key){
//     return localStorage.getItem(key);
// }


// (game intiilization and setup)
// loadGame();

// function loadGame(){
//     createCards();
//     cards = document.querySelectorAll('.card');
//     cardFlyInEffect();
//     playGameButtonElem.addEventListener('click', ()=>startGame());
//     updateStatusElement(scoreContainerElem,"none");
//     updateStatusElement(roundContainerElem,"none");
// }

// function createCards(){
//     cardObjectDefinitions.forEach((cardItem)=>{
//         createCard(cardItem);
//     });
// }

// function createCard(cardItem){
//     //create div elements that make up a card
//     const cardElem = createElement('div');
//     const cardInnerElem = createElement('div');
//     const cardFrontElem = createElement('div');
//     const cardBackElem = createElement('div');

//     //create front and back image elements for a card
//     const cardFrontImg = createElement('img');
//     const cardBackImg = createElement('img');

//     //add class and id to card element
//     addClassToElement(cardElem, 'card');
//     addClassToElement(cardElem, 'fly-in');
//     addIdToElement(cardElem, cardItem.id);

//     //add class to inner card element
//     addClassToElement(cardInnerElem, 'card-inner');
    
//     //add class to front card element
//     addClassToElement(cardFrontElem, 'card-front');

//     //add class to back card element
//     addClassToElement(cardBackElem, 'card-back');

//     //add src attribute and appropriate value to img element - back of card
//     addSrcToImageElem(cardBackImg, cardBackImgPath);

//     //add src attribute and appropriate value to img element - front of card
//     addSrcToImageElem(cardFrontImg, cardItem.imagePath);

//     //assign class to back image element of back of card
//     addClassToElement(cardBackImg, 'card-img');
   
//     //assign class to front image element of front of card
//     addClassToElement(cardFrontImg, 'card-img');

//     //add front image element as child element to front card element
//     addChildElement(cardFrontElem, cardFrontImg);

//     //add back image element as child element to back card element
//     addChildElement(cardBackElem, cardBackImg);

//     //add front card element as child element to inner card element
//     addChildElement(cardInnerElem, cardFrontElem);

//     //add back card element as child element to inner card element
//     addChildElement(cardInnerElem, cardBackElem);

//     //add inner card element as child element to card element
//     addChildElement(cardElem, cardInnerElem);

//     //add card element as child element to appropriate grid cell
//     addCardToGridCell(cardElem);

//     initializeCardPositions(cardElem);
//     attatchClickEventHandlerToCard(cardElem);
// }

// function attatchClickEventHandlerToCard(card){
//     card.addEventListener('click', () => chooseCard(card));
// }

// function initializeCardPositions(card){
//     cardPositions.push(card.id);
// }

// function addCardToGridCell(card){
//     const cardPositionClassName = mapCardIdToGridCell(card);
//     const cardPosElem = document.querySelector(cardPositionClassName);
//     addChildElement(cardPosElem, card);
// }

// function mapCardIdToGridCell(card){
//     if(card.id == 1){
//         return '.card-pos-a';
//     } else if(card.id == 2){
//         return '.card-pos-b';
//     } else if(card.id == 3){
//         return '.card-pos-c';
//     } else if(card.id == 4){
//         return '.card-pos-d';
//     }
// }
//  (game functions)

//  function startGame(){
//     initializeNewGame();
//     startRound();
// }

// function initializeNewGame(){
//     score = 0;
//     roundNum = 0;
//     checkForIncompleteGame();
//     shufflingInProgress = false;
//     updateStatusElement(scoreContainerElem,"flex");
//     updateStatusElement(roundContainerElem,"flex");
//     updateStatusElement(scoreElem,"block",primaryColor,`Score <span class='badge'>${score}</span>`);
//     updateStatusElement(roundElem,"block",primaryColor,`Round <span class='badge'>${roundNum}</span>`);
// }

// function checkForIncompleteGame(){
//     const serializedGameObj = getLocalStorageItemValue(localStorageGameKey);
//     if(serializedGameObj){
//         gameObj = getObjectFromJSON(serializedGameObj);
//         if(gameObj.round >= maxRounds){
//             removeLocalStorageItem(localStorageGameKey);
//         } else {
//             if(confirm('Would you like to continue with your last game?')){
//                 score = gameObj.score;
//                 roundNum = gameObj.round;
//             }
//         }
//     }
// }

// function startRound(){
//     initializeNewRound();
//     collectCards();
//     flipCards(true);
//     shuffleCards();
// }

// function initializeNewRound(){
//     roundNum++;
//     playGameButtonElem.disabled = true;
//     gameInProgress = true;
//     shufflingInProgress = true;
//     cardsRevealed = false;
//     updateStatusElement(currentGameStatusElem, "block", primaryColor, "Shuffling...");
//     updateStatusElement(roundElem, "block", primaryColor, `Round <span class='badge'>${roundNum}</span>`);
// }

// function collectCards(){
//     transformGridArea(collapsedGridAreaTemplate);
//     addCardsToGridAreaCell(cardCollectionCellClass);
// }

// function transformGridArea(areas){
//     cardContainerElem.style.gridTemplateAreas = areas;
// }

// function addCardsToGridAreaCell(cellPositionClassName){
//     const cellPositionElem = document.querySelector(cellPositionClassName);
//     cards.forEach((card, index) =>{
//         addChildElement(cellPositionElem, card);
//     });
// }

// (card  manipualtion functions)
// function flipCard(card, flipToBack){
//     const innerCardElem = card.firstChild;
//     if(flipToBack && !innerCardElem.classList.contains('flip-it')){
//         innerCardElem.classList.add('flip-it');
//     } else if(innerCardElem.classList.contains('flip-it')){
//         innerCardElem.classList.remove('flip-it');
//     }
// }

// function flipCards(flipToBack){
//     cards.forEach((card,index)=>{
//         setTimeout(() => {
//             flipCard(card,flipToBack);
//         },index * 100);
//     });
// }

// function cardFlyInEffect(){
//     const id = setInterval(flyIn, 5);
//     let cardCount = 0;
//     let count = 0;

//     function flyIn(){
//         count++;
//         if(cardCount == numCards){
//             clearInterval(id);
//             playGameButtonElem.style.display = "inline-block";
//         }
//         if(count == 1 || count == 250 || count == 500 || count == 750){
//             cardCount++;
//             let card = document.getElementById(cardCount);
//             card.classList.remove("fly-in");
//         }
//     }
// }

// function removeShuffleClasses(){
//     cards.forEach((card) =>{
//         card.classList.remove("shuffle-left");
//         card.classList.remove("shuffle-right");
//     });
// }

// function animateShuffle(shuffleCount){
//     const random1 = Math.floor(Math.random() * numCards) + 1;

