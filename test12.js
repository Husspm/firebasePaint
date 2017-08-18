var w = 816,
    h = 1056,
    anglePoints = [],
    sZcG = [3.5];

function createPoints() {
    for (var angle = 0; angle <= 2; angle += 0.125) {
        var pointOnCircle = angle * Math.PI;
        anglePoints.push(pointOnCircle);
    }
}
createPoints();

function setup() {
    createCanvas(w, h);
    background(0);
}
var startRadius = 4000;
var sW = 35;
var iterations = 0;
var cGiT = 0;

function draw() {
    iterations++;
    if (iterations > 240) {
        setup();
        iterations = 0;
        sW = 35;
    }
    if (startRadius < 400) {
        startRadius = 4000;
    }
    var circle = new Circle(0, 0, startRadius);
    translate(w / 2, h / 2);
    sW *= 0.95;
    strokeWeight(sW);
    noFill();
    stroke('rgba(250, 250, 250, 0.05)');
    startRadius = startRadius * 0.66;
    for (i = 0; i < anglePoints.length - 1; i++) {
        let a = anglePoints[i];
        var smallerCircle = new Circle(circle.radius * (sin(a)), circle.radius * (cos(a)), startRadius * sZcG[cGiT]);
        ellipse(smallerCircle.x, smallerCircle.y, smallerCircle.radius);

    }
    cGiT++;
    if (cGiT >= sZcG.length) {
        cGiT = 0;
    }
}

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function mousePressed() {
    //redraw();
}