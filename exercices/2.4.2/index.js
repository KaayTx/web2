const redLamp = document.querySelector(".red");
const orangeLamp = document.querySelector(".orange");
const greenLamp = document.querySelector(".green");

const redColor = "red";
const orangeColor = "orange";
const greenColor = "green";
const noColor = "";

const delayBetweenChanges = 1000;

cycleThroughLamps();

function cycleThroughLamps() {
  window.setInterval(
    showFromRedToGreenToRedWithDelays,
    delayBetweenChanges * 4
  );
}

showFromRedToGreenToRedWithDelays();

function showFromRedToGreenToRedWithDelays() {
  showRedLamp();
  showOrangeLampOnlyWithDelay(delayBetweenChanges);
  showGreenLampOnlyWithDelay(2*delayBetweenChanges);
  showOrangeLampOnlyWithDelay(3*delayBetweenChanges);
  showRedLampOnlyWithDelay(4*delayBetweenChanges);
}

function showRedLamp() {
  redLamp.style.backgroundColor = redColor;
}
function clearRedLamp() {
  redLamp.style.backgroundColor = noColor;
}

function showRedLampOnlyWithDelay(delay) {
    window.setTimeout(() => {
        clearOrangeLamp();
        clearGreenLamp();
        showRedLamp();
    }, delay);
}


function showOrangeLamp() {
  orangeLamp.style.backgroundColor = orangeColor;
}

function clearOrangeLamp() {
  orangeLamp.style.backgroundColor = noColor;
}

function showOrangeLampOnlyWithDelay(delay) {
  window.setTimeout(() => {
    clearRedLamp();
    clearGreenLamp();
    showOrangeLamp();
  }, delay);
}

function showGreenLampOnlyWithDelay(delay) {
  window.setTimeout(() => {
    clearRedLamp();
    clearOrangeLamp();
    showGreenColor();
  }, delay);
}

function showGreenColor() {
  greenLamp.style.backgroundColor = greenColor;
}
function clearGreenLamp() {
  greenLamp.style.backgroundColor = noColor;
}
