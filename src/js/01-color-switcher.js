function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;
let timerId = null;

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(timerId);
});

// Version 2

// startBtn.addEventListener("click", startRandomHexColor);
// stopBtn.addEventListener("click", stopRandomHexColor);

// function startRandomHexColor() {
//     startBtn.disabled = true;
//     stopBtn.disabled = false;

//     timerId = setInterval(() => {
//         body.style.backgroundColor = getRandomHexColor();
//     }, 1000);
// };

// function stopRandomHexColor() {
//     startBtn.disabled = false;
//     stopBtn.disabled = true;

//     clearInterval(timerId);
// };