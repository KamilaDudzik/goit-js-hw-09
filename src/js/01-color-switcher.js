function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const colorStart = document.querySelector("button[data-start]");
const colorStop = document.querySelector("button[data-stop]");
let timerId = null;

colorStart.addEventListener("click", () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

colorStop.addEventListener("click", () => {
    clearInterval(timerId);
});