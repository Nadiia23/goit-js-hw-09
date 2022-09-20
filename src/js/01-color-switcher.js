const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

buttonStop.disabled = true;

buttonStart.addEventListener('click', changeBackgroundColor);

let timerId;

function changeBackgroundColor() {
    startActive();
    timerId = setInterval(() => {
        const bodyColor = getRandomHexColor();
        body.style.background = bodyColor;
    }, 1000);
}

buttonStop.addEventListener('click', onStop);

function onStop() {
    stopActive();
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startActive() {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
};

function stopActive() {
    buttonStop.disabled = true;
    buttonStart.disabled = false;
}
