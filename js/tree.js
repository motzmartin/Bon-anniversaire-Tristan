class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Vector {
    constructor(pointA, pointB) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.length = Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2);
    }
}

class Branch {
    constructor(vector, angle, layer, lineWidth) {
        this.vector = vector;
        this.angle = angle;
        this.layer = layer;
        this.lineWidth = lineWidth;
        this.children = [];
    }
}

function degreesToRadiant(degrees) {
    return degrees * Math.PI / 180;
}

function pointOnCircle(centerPoint, angle, radius) {
    // angle in radiant
    const cos = Math.cos(angle) * radius;
    const sin = Math.sin(angle) * radius;

    const x = centerPoint.x + cos;
    const y = centerPoint.y - sin; // Because we are in canvas

    return new Point(x, y);
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// CONST
const MAX_LAYER = 12;
const BASE_ANGLE = 90;
const ANGLE_ADD = 20; // degrees
const MAIN_BRANCH_LENGTH = 25;
const BASE_LINEWIDTH = MAX_LAYER;
const LINEWIDTH_SUBSTRACT = 1;
const BRANCH_SIZE_DECREASE_FACTOR = 1;
const BRANCH_ANGLE_VARIATION_RANGE = 50;

// MAIN_BRANCH
const mainBranchStartPoint = new Point(canvas.width / 2, canvas.height);
const mainBranchEndPoint = pointOnCircle(mainBranchStartPoint, degreesToRadiant(BASE_ANGLE), MAIN_BRANCH_LENGTH);
const mainBranchVector = new Vector(mainBranchStartPoint, mainBranchEndPoint);
const mainBranchLayer = 0;
const mainBranch = new Branch(mainBranchVector, BASE_ANGLE, mainBranchLayer, BASE_LINEWIDTH)

// BRANCHS ARRAY TO DRAW THE TREE MORE EASILY (DON'T NEED TO USE RECURSIVE FUNCTIONS)
let branchs = [mainBranch];

// GROW THE TREE
function grow(parentBranch) {
    const randomBranchLength = Math.floor(Math.random() * (MAX_LAYER - parentBranch.layer) + parentBranch.layer);
    if (parentBranch.layer < randomBranchLength) {
        // const randomAngleAdd = Math.floor(Math.random() * (20 - 5)) + 5;
        for (let i = 0; i < 2; i++) {
            // const childBranchAngle = (i == 0) ? parentBranch.angle - randomAngleAdd : parentBranch.angle + randomAngleAdd;
            const childBranchAngle = parentBranch.angle + (Math.floor(Math.random() * BRANCH_ANGLE_VARIATION_RANGE) - BRANCH_ANGLE_VARIATION_RANGE / 2);
            // const childBranchAngle = (i % 2 == 0) ? parentBranch.angle - ANGLE_ADD : parentBranch.angle + ANGLE_ADD;

            const childBranchLayer = parentBranch.layer + 1;
            const childBranchLineWidth = parentBranch.lineWidth - LINEWIDTH_SUBSTRACT;

            // childBranchStartPoint is the parentBranchEndPoint
            const childBranchStartPoint = parentBranch.vector.pointB;
            // endPoint calculus
            const childBranchLength = parentBranch.vector.length * BRANCH_SIZE_DECREASE_FACTOR ** childBranchLayer;
            const childAngleRadiant = degreesToRadiant(childBranchAngle);
            const childBranchEndPoint = pointOnCircle(childBranchStartPoint, childAngleRadiant, childBranchLength);
            // startPoint, endPoint
            const childBranchVector = new Vector(childBranchStartPoint, childBranchEndPoint);

            const childBranch = new Branch(childBranchVector, childBranchAngle, childBranchLayer, childBranchLineWidth)

            parentBranch.children.push(childBranch)
            branchs.push(childBranch)

            // Recursive function call
            grow(childBranch)
        }
    }
}

function drawLeafs(branchs) {
    for (let branch of branchs) {
        const branchEndPoint = branch.vector.pointB;
        if (branch.children.length == 0) {
            ctx.beginPath()
            ctx.fillStyle = "green";
            ctx.arc(branchEndPoint.x, branchEndPoint.y, 25, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// DRAW THE TREE
function drawBranchs(branchs) {
    for (let branch of branchs) {
        const branchStartPoint = branch.vector.pointA;
        const branchEndPoint = branch.vector.pointB;
        const branchLineWidth = branch.lineWidth;

        ctx.beginPath()
        ctx.moveTo(branchStartPoint.x, branchStartPoint.y)
        ctx.lineTo(branchEndPoint.x, branchEndPoint.y)
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.lineWidth = branchLineWidth;
        ctx.stroke()
    }
}

grow(mainBranch)
drawBranchs(branchs)
drawLeafs(branchs)