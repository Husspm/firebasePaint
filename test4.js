// declaring my own random number function to avoid writing Math.random() * x all the time
var pick;

function RDM(max, min) {
    var numbers = [];
    for (var amount = 0.5; amount <= 10; amount += 0.25) {
        if (min) {
            var newRDM2 = Math.random() * min / amount;
            numbers.push(newRDM2);
        }
        var newRDM = Math.random() * max / amount;
        numbers.push(newRDM);
    }
    numbers.sort(function(a, b) {
        return a - b;
    });
    pick = numbers[Math.floor(Math.random() * numbers.length)];
    return pick;
}
//declaring some mathy variables

PI = Math.PI;

var colors = [
    { mode: "rgba(", red: "250,", green: "250,", blue: "250,", alpha: "0.5)" },
    { mode: "rgba(", red: "20,", green: "20,", blue: "20,", alpha: "0.5)" }
];

var clrIdx = 0;
var clrTarget = ["border-color", "background-color"];
$("select").change(function() {
    clrIdx = this.value;
});
//slider controls for custom colors
$("input[type='range']").on("input", function() {
    if (this.id === "alpha") {
        //colors[clrIdx][this.id] = this.value + ")";
    } else if (this.id === "pixelate") {
        blurAmount = this.value;
    } else {
        colors[clrIdx][this.id] = this.value + ",";
    }
    //dipslays current color in preview window
    $("#colorPreview").css(clrTarget[clrIdx], colors[clrIdx].mode + colors[clrIdx].red + colors[clrIdx].green + colors[clrIdx].blue + colors[clrIdx].alpha);
}); //ends slider function
//randomizer generates random colors. ! might need to reuse later too, ...later... turns out I did 
$("#randomize").click(randomizer);

function randomizer() {
    for (var key in colors[clrIdx]) {
        if (key !== "mode")
            colors[clrIdx][key] = Math.floor(RDM(256)) + ",";
        if (key === "alpha") {
            newNumber = RDM(1) + 0.4;
            colors[clrIdx][key] = newNumber + ")";
        }
    }
    $("#colorPreview").css(clrTarget[clrIdx], colors[clrIdx].mode + colors[clrIdx].red + colors[clrIdx].green + colors[clrIdx].blue + colors[clrIdx].alpha);
}

var width = 1200;
var height = 800;
var canvas = document.getElementById("paintSurface");
var ctx = canvas.getContext("2d");
var brightnessAmount = 250;
ctx.canvas.height = height;
ctx.canvas.width = width;
console.log(ctx);
ctx.globalCompositeOperation = 'destination-over';
$("#reset").click(reset);

function reset() {
    totalCircles = [];
    iterations = 0;
    extendAmount = 1.04;
    blurAmount = 0;
    initialRadius = 2;
    initialRadius2 = 1;
    newRadius = 10;
    width = 1200;
    height = 800;
    positionX = 0;
    positionY = 0;
    posX = 0;
    lineWidth = 1;
    frameRate = 10;
    runCheck();
    canvas = document.getElementById("paintSurface");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = window.innerHeight + 102.9999;
    ctx.canvas.width = window.innerWidth;
    ctx.globalAlpha = 0.6;
    //ctx.globalCompositeOperation = 'destination-over';
}

var blurAmount = 0;
var auto = setInterval(function() { computerMakeArt(); }, 1000 / (RDM(30, 3) + 3));
var circle = new Circle(RDM(width), RDM(height), RDM(2000));
var totalCircles = [];
var running = false;

function runCheck() {
    if (running === true) {
        clearInterval(auto);
        running = false;
    } else {
        auto = setInterval(function() { computerMakeArt(); }, 1000 / (RDM(30, 3) + 3));
        running = true;
    }
}
var frameRate = 10;

function keepTrack(max) {
    if (iterations > max) {
        clearInterval(auto);
        runCheck();
        reset();
        // save canvas image as data url (png format by default)
        var dataURL = canvas.toDataURL();

        // set canvasImg image src to dataURL
        // so it can be saved as an image
        document.getElementById('canvasImg').src = dataURL;

    }

}
var positionX = width / 2;
var positionY = height / 2;

var blurAmount = 0;
var newRadius = 1800;

var posX = 0;
var posY = 0;
var TAU = 2 * PI;
var anglePoints = [0, 0.125 * PI, 0.25 * PI, 0.375 * PI, 0.5 * PI, 0.625 * PI, 0.75 * PI, 0.875 * PI, PI, 1.125 * PI, 1.25 * PI, 1.375 * PI, 1.5 * PI, 1.625 * PI, 1.75 * PI, 1.875 * PI, 2 * PI];
var initialRadius = 10;
var iterations = 0;
var extendAmount = 1.02;
var lineWidth = 1;
var allow = true;
reset();

ctx.translate(width / 2, height / 2);

function computerMakeArt() {
    //keepTrack(166);
    iterations++;
    var circle = new Circle(0, 0, newRadius);
    var circle3 = new Circle(0, 0, circle.radius / 4);
    var circle4 = new Circle(0, 0, circle3.radius / 4);
    if (iterations % 172 === 0) {
        newRadius = 4000;
        extendAmount = 1;
        extendAmount *= 0.999;
    }
    circle.save();
    circle3.save();
    circle4.save();
    circle.move();
    circle3.move();
    circle4.move();
    running = true;
    if (iterations % 1 === 0) {
        randomizer();
        if (clrIdx === 0) {
            clrIdx = 1;
        } else {
            clrIdx = 0;
        }
    }
    lineWidth = RDM(0.7, 60);
    ctx.canvas.style.filter = "contrast(160%)";
    for (var i = totalCircles.length - 1; i >= (totalCircles.length - 2); i--) {
        ctx.beginPath();
        posX += RDM(30);
        if (posX > width) {
            posX = 0;
        }
        posY += RDM(70);
        if (posY > width) {
            posY = 0;
        }
        ctx.lineWidth = lineWidth * 2;
        ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
        for (var index = 0; index < anglePoints.length - 1; index++) {
            var startX = totalCircles[i].posX + totalCircles[i].radius * Math.cos(anglePoints[index]);
            var startY = totalCircles[i].posY + totalCircles[i].radius * Math.sin(anglePoints[index]);
            var innerX = totalCircles[i].posX + (totalCircles[i].radius * 0.75) * Math.cos(anglePoints[index]);
            var innerY = totalCircles[i].posY + (totalCircles[i].radius * 0.75) * Math.sin(anglePoints[index]);
            var innerX2 = totalCircles[i].posX + (totalCircles[i - 1].radius / 6) * Math.cos(anglePoints[index]);
            var innerY2 = totalCircles[i].posY + (totalCircles[i - 1].radius / 6) * Math.sin(anglePoints[index]);
            var innerX3 = totalCircles[i].posX + (totalCircles[i].radius * 1.5) * Math.cos(anglePoints[index]);
            var innerY3 = totalCircles[i].posY + (totalCircles[i].radius * 1.5) * Math.sin(anglePoints[index]);
            var endX = totalCircles[i].posX + totalCircles[i].radius * Math.cos(anglePoints[index + 1]);
            var endY = totalCircles[i].posY + totalCircles[i].radius * Math.sin(anglePoints[index + 1]);
            //ctx.ellipse(totalCircles[i].posX, totalCircles[i].posY, totalCircles[i].radius, totalCircles[i].radius, RDM(360) * Math.PI / RDM(180), 0, 2 * PI);
            ctx.moveTo(startX, startY);
            ctx.filter = "blur(" + RDM(0, 30) + ")";
            ctx.bezierCurveTo(innerX, innerY, innerX2, innerY2, endX, endY);
            ctx.bezierCurveTo(innerX, innerY, innerX3, innerY3, endX, endY);
            ctx.bezierCurveTo(RDM(width, -width), RDM(height, -height), RDM(width, -width), RDM(height, -height), RDM(width, -width), RDM(height, -height));
            ctx.moveTo(innerX, innerY);
            ctx.bezierCurveTo(RDM(width, -width), RDM(height, -height), RDM(width, -width), RDM(height, -height), RDM(width, -width), RDM(height, -height));
            //ctx.quadraticCurveTo(innerX2, innerY2, endX, endY);
            //ctx.moveTo(endX, endY);
            //ctx.quadraticCurveTo(innerX2, innerY2, startX, startY);
        }
        //ctx.ellipse(RDM(width), RDM(height) / 2, initialRadius += RDM(0.3), initialRadius2 += RDM(0.2), 45 * Math.PI / 180, 0, 2 * PI);
        ctx.stroke();
        ctx.lineWidth = lineWidth * 3;
        ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
        ctx.stroke();
        ctx.lineWidth = lineWidth * 5;
        ctx.strokeStyle = "rgba(10, 10, 10, 0.3)";
        ctx.stroke();
        ctx.lineWidth = lineWidth * 4;
        ctx.strokeStyle = "rgba(255, 255, 250, 0.4)";
        ctx.stroke();
        ctx.fillStyle = "rgba(20, 20, 20, 0.1)";
        ctx.fill();
        ctx.closePath();
    }
}

function Circle(x, y, radius) {
    this.posX = x;
    this.posY = y;
    this.endX = x + 20;
    this.endY = y + 20;
    this.radius = radius;
    this.save = function() {
        totalCircles.push(this);
    };
    this.move = function() {
        this.posX += RDM(-width / 2, width / 2);
        this.posY += RDM(-height / 2, height / 2);

    };
}