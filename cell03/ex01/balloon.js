const balloon = document.getElementById("balloon");

const colors = ["red", "green", "blue"];
let colorIndex = 0;
let size = 200;

function updateBalloon() {
    balloon.style.width = size + "px";
    balloon.style.height = size + "px";
    balloon.style.backgroundColor = colors[colorIndex];
}

balloon.addEventListener("click", () => {
    size += 10;
    if (size > 420) {
        size = 200;
        colorIndex = 0;
    } else {
        colorIndex = (colorIndex + 1) % colors.length;
    }
    updateBalloon();
});

balloon.addEventListener("mouseleave", () => {
    if (size > 200) {
        size -= 5;
        if (size < 200) {
            size = 200;
        }
        colorIndex = (colorIndex - 1 + colors.length) % colors.length;
        updateBalloon();
    }
});