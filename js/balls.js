let mouse_x = 0;
let mouse_y = 0;

const balls = [];

const balls_color = [
    "C0392B", "E74C3C", "9B59B6", "8E44AD",
    "2980B9", "3498DB", "1ABC9C", "16A085",
    "27AE60", "2ECC71", "F1C40F", "F39C12",
    "E67E22", "D35400"
];

document.onmousemove = (e) => {
    mouse_x = e.clientX;
    mouse_y = e.clientY;
};

class Ball {
    constructor(x, y, ball_div, size) {
        this.acceleration_x = Math.random() - 0.5;
        this.acceleration_y = -2;

        this.x = x;
        this.y = y;

        this.size = size;

        this.html_element = ball_div;
    }

    update() {
        this.acceleration_y += 0.05;

        this.x += this.acceleration_x;
        this.y += this.acceleration_y;

        this.html_element.style.left = `${this.x}px`;
        this.html_element.style.top = `${this.y}px`;
    }

    isFinished() {
        return this.y >= window.innerHeight - this.size;
    }
}

function frame() {
    for (let i = balls.length - 1; i >= 0; i--) {
        balls[i].update();

        if (balls[i].isFinished()) {
            balls[i].html_element.remove();
            balls.splice(i, 1);
        }
    }

    requestAnimationFrame(frame);
}

frame();

let do_water = false;
function enableCursorWater() {
    do_water = !do_water;
    updateBalls();
}

let balls_plop_delay = 50;
var updateBalls = () => {
    if (do_water) {
        const ball_size = Math.floor(Math.random() * 50) + 10;

        const ball_div = document.createElement("div");

        ball_div.style.position = "absolute";
        ball_div.style.pointerEvents = "none";
        ball_div.style.borderRadius = "50%";

        ball_div.style.width = ball_div.style.height = `${ball_size}px`;
        ball_div.style.backgroundColor = `#${balls_color[Math.floor(Math.random() * balls_color.length)]}`;

        const ball = new Ball(mouse_x - ball_size / 2, mouse_y - ball_size / 2, ball_div, ball_size);
        balls.push(ball);

        document.body.appendChild(ball_div);
        setTimeout(updateBalls, balls_plop_delay);
    }
};
const WHEEL_AFFECT_BALLS_PLOP = 10;
window.onwheel = (e) => {
    if (e.deltaY < 0) {
        balls_plop_delay += WHEEL_AFFECT_BALLS_PLOP;
    } else {
        balls_plop_delay = (((balls_plop_delay - WHEEL_AFFECT_BALLS_PLOP) < 0) ? 0 : balls_plop_delay - WHEEL_AFFECT_BALLS_PLOP);
    }
}