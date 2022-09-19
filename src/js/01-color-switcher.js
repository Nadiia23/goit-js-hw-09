function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

buttonStop.disabled = true;

buttonStart.addEventListener('click', onStart);

let timerId;

function onStart() {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    timerId = setInterval(() => {
        const bodyColor = getRandomHexColor();
        body.style.background = bodyColor;
    }, 1000);
}

buttonStop.addEventListener('click', onStop);

function onStop() {
    buttonStop.disabled = true;
    buttonStart.disabled = false;
    clearInterval(timerId);
}
