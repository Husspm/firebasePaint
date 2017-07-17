var w = 2550,
    h = 3300,
    anglePoints = [];
var scale = 2;

function createPoints() {
    for (var angle = 0; angle <= 2; angle += 0.1) {
        var pointOnCircle = angle * Math.PI;
        anglePoints.push(pointOnCircle);
    }
    console.log(anglePoints);
}
createPoints();

function setup() {
    createCanvas(w,h);
    background(0);
    noLoop();
}
var startRadius = 8500;
var sW = 2;

function draw() {
    if (startRadius < 100){
        startRadius = 8500;
    }
    var circle = new Circle(0, 0, startRadius);
    translate(w / 2, h / 2);
    sW *= 0.999;
    strokeWeight(sW);
    stroke('rgba(190, 190, 190, 0.5)');
    noFill();
    //ellipse(circle.x, circle.y, circle.radius);
    startRadius = startRadius * 0.95;
    for(i = 0; i < anglePoints.length; i++){
        let a = anglePoints[i];
        var smallerCircle = new Circle(circle.radius*(sin(a)) - 120, circle.radius*(cos(a)) - 120, startRadius * 1.75);
        ellipse(smallerCircle.x + random(-500, 500), smallerCircle.y + random(-500,500), smallerCircle.radius + random(-500, 600));
        for(j = 0; j < anglePoints.length; j++){
            let a = anglePoints[j];
            let sC = new Circle(smallerCircle.x*(sin(a)), smallerCircle.y*(cos(a)),smallerCircle.radius * 0.25);
            //rect(sC.x - random(50, 450), sC.y - random(50, 550), sC.radius + random(-500, 500), sC.radius + random(-500,500));
        }
    }
}

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function mousePressed() {
    redraw();
}