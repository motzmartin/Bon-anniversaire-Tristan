let mouse_x = 0;
let mouse_y = 0;

const heads = [];

document.onmousemove = (e) => {
    mouse_x = e.clientX;
    mouse_y = e.clientY;
};

class Head {
    constructor(x, y, head_img, size) {
        this.acceleration_x = Math.random() - 0.5;
        this.acceleration_y = -2;

        this.acceleration_deg = Math.random() - 0.5;
        this.deg = 0;

        this.x = x;
        this.y = y;

        this.size = size;

        this.html_element = head_img;
    }

    update() {
        this.acceleration_y += 0.05;

        this.x += this.acceleration_x;
        this.y += this.acceleration_y;

        this.deg += this.acceleration_deg;

        this.html_element.style.transform = `rotate(${this.deg}deg)`;
        this.html_element.style.left = `${this.x}px`;
        this.html_element.style.top = `${this.y}px`;
    }

    isFinished() {
        return this.y >= window.innerHeight;
    }
}

function frame() {
    for (let i = heads.length - 1; i >= 0; i--) {
        heads[i].update();

        if (heads[i].isFinished()) {
            heads[i].html_element.remove();
            heads.splice(i, 1);
        }
    }

    requestAnimationFrame(frame);
}

frame();

setInterval(() => {
    const head_size = Math.floor(Math.random() * 30) + 30;

    const head_img = document.createElement("img");
    head_img.src = `images/emoji (${Math.floor(Math.random() * 40) + 1}).webp`;

    head_img.style.position = "absolute";
    head_img.style.pointerEvents = "none";

    head_img.style.width = `${head_size}px`;

    const head = new Head(mouse_x - head_size / 2, mouse_y - head_size / 2, head_img, head_size);
    heads.push(head);

    document.body.appendChild(head_img);
}, 50);