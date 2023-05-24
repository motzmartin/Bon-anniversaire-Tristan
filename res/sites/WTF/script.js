const container = document.getElementById("container");
const audio = document.querySelector("audio");
const hidden = document.getElementById("hidden");

hidden.onclick = function() {
	hidden.style.display = "none";
	audio.volume = 0.5;
	audio.play()
}

let bodies = new Array();

function rand(max, min) {
	if (min) {
		return Math.floor(Math.random() * (max - min) + min)
	}
	return Math.floor(Math.random() * max)
}

function Body() {
	this.width = rand(150, 10);
	this.height = this.width;
	this.rotateSpeed = Math.random() < 0.5 ? -1 * Math.ceil(Math.random() * 5) : Math.ceil(Math.random() * 5);
	this.angle = 0;
	this.x = rand(window.innerWidth - this.width);
	this.y = rand(window.innerHeight - this.height)

	this.html = document.createElement("div");
	this.html.setAttribute("class", "body")

	this.html.style.width = this.width + "px";
	this.html.style.height = this.height + "px";
	this.html.style.left = this.x + "px";
	this.html.style.top = this.y + "px";
	this.html.style.backgroundImage = "url('src/images/" + Math.ceil(Math.random() * 3) + ".png')";

	this.rotate = function() {
		this.angle += this.rotateSpeed;
		this.html.style.transform = "rotate(" + this.angle + "deg)";
	}

	this.update = function() {
		this.rotate()
	}
}

for (let i = 0; i < 25; i++) {
	let newBody = new Body();
	container.append(newBody.html)
	bodies.push(newBody)
}

function update() {
	for (let element of bodies) {
		element.update()
	}
	requestAnimationFrame(update)
}

requestAnimationFrame(update)