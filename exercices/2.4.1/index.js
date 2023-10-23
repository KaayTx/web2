const maxTime = 5; //les 5 secondes
const expectedClicks = 10; //nb clicks qu'on doit faire
let startTime;
let currentClicks = 0; //nb de clicks qu'on a fait
let timerID;

const button = document.querySelector('button');
const message = document.querySelector('#message');

button.addEventListener('mouseenter', startCounting);
button.addEventListener('click', clickCounter);

function startCounting(){
    startTime = new Date();
    //setTimeOut est tjrs en millisecondes
    // et là on veut voir en détails qui a gagné, si on a tout les 2 en secondes, et qd on a fait en 3 secondes alors on saitpas qui a gagner -> faut en ms
    timerID = setTimeout(printLoss, maxTime * 1000);
}

function clickCounter(){
    ++currentClicks;
    if(currentClicks === expectedClicks){
        clearTimeout(timerID);
        win();
    }
}

function printLoss(){
    clearTimeout(timerID);
    button.style.display = 'none';
    message.innerHTML = `Game over, you did not click ${expectedClicks} times within ${maxTime}s !
    You clicked ${currentClicks} times`;
}

function win(){
    const timeSpent = new Date().getTime() - startTime.getTime();
    button.style.display = 'none';
    message.innerHTML = `You win ! You clicked ${expectedClicks} times within ${timeSpent}s`;
}