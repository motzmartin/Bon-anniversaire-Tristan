// Valheim trunks
const TREE_HEIGHT = 100;
const TREE_FALL_SPEED = 10;
class Trunk {
    constructor(y) {
        this.y = y;
        this.createHtmlElement();
        this.startAnimation();
    }
    startAnimation() {
        this.interval = setInterval(() => {
            this.y += TREE_FALL_SPEED;
            this.htmlElement.style.top = this.y + "px";

            if (this.y > window.innerHeight + TREE_HEIGHT) {
                this.htmlElement.remove();
                clearInterval(this.interval);
            }
        }, 1000 / 60);
    }
    createHtmlElement() {
        this.htmlElement = document.createElement("img");
        this.htmlElement.src = "res/img/trunk.png";
        this.htmlElement.style.position = "fixed";
        this.htmlElement.style.left = "50%";
        this.htmlElement.style.top = this.y + "px";
        this.htmlElement.style.transform = "translate(-50%, -50%)";
        document.body.append(this.htmlElement);
    }
}
const NUMBER_OF_TREE_FALL = 5;
function treesFall() {
    for (let i = 0; i < NUMBER_OF_TREE_FALL; i++) {
        new Trunk(- i * 2 * TREE_HEIGHT);
    }
}
// Pride cloud cross
const CLOUD_WIDTH = 100;
const CLOUD_CROSS_SPEED = 10;
class Pride_Cloud {
    constructor() {
        this.x = window.innerWidth + CLOUD_WIDTH;
        this.createElement();
        this.startAnimation();
    }
    startAnimation() {
        this.interval = setInterval(() => {
            this.x -= CLOUD_CROSS_SPEED;
            this.htmlElement.style.left = this.x + "px";

            if (this.x < -CLOUD_WIDTH) {
                this.htmlElement.remove();
                clearInterval(this.interval);
            }
        }, 1000 / 60);
    }
    createElement() {
        this.htmlElement = document.createElement("img");
        this.htmlElement.src = "res/img/pride_cloud.gif";
        this.htmlElement.style.position = "fixed";
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = "50%";
        this.htmlElement.style.transform = "translate(-50%, -50%)";
        document.body.append(this.htmlElement);
    }
}
function prideCloudCross() {
    new Pride_Cloud();
}
// Names change
let name_index = 0;
setInterval(() => {
    document.querySelector("#name_display").textContent = names[name_index];
    name_index = name_index >= names.length ? 0 : name_index + 1;
}, 500)