// declaring my own random number function to avoid writing Math.random() * x all the time

function RDM(max) {
    var newRDM = max * Math.random();
    return newRDM;
}

PI = Math.PI;

var colors = [
    { mode: "rgba(", red: "250,", green: "0,", blue: "0,", alpha: "0.8)" },
    { mode: "rgba(", red: "20,", green: "20,", blue: "20,", alpha: "0.8)" }
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
            colors[clrIdx][key] = Math.floor(RDM(256)) - 70 + ",";
        if (key === "alpha") {
            newNumber = RDM(1) + 0.4;
            colors[clrIdx][key] = newNumber + ")";
        }
    }
    $("#colorPreview").css(clrTarget[clrIdx], colors[clrIdx].mode + colors[clrIdx].red + colors[clrIdx].green + colors[clrIdx].blue + colors[clrIdx].alpha);
}
/*
function runCheck() {
    if (running === true) {
        clearInterval(auto);
        running = false;
    } else {
        auto = setInterval(function() { computerMakeArt(); }, 1000 / 60);
        running = true;
    }
}
*/
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
var anglePoints = [];
var totalCircles = [];

function makePoints() {
    for (var points = 0; points <= 3; points += 0.125) {
        var angle = points * PI;
        anglePoints.push(angle);
    }
}
makePoints();

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}
var running = false;
var iterations = 0;

var mic;

function setup() {
    mic = new p5.AudioIn();
    mic.start();
    frameRate = 240;
}

function draw() {
    micLevel = mic.getLevel();
    if (micLevel > 0.1) {
        computerMakeArt();
    }
}

function computerMakeArt() {
    iterations++;
    if (iterations % 250 === 0) {
        makePoints();
    }
    if (iterations % 2 === 0) {
        randomizer();
        if (clrIdx === 0) {
            clrIdx = 1;
        } else {
            clrIdx = 0;
        }
    }
    var circle = new Circle(RDM(350), RDM(350), RDM(900));
    ctx.beginPath();
    ctx.filter = "blur(" + RDM(50) + "px)";
    lineWidth = RDM(55);
    ctx.ellipse(circle.x, circle.y, circle.radius, circle.radius, RDM(360) * PI / 180, 0, 2 * PI);
    ctx.lineWidth = lineWidth * 4;
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.stroke();
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6 )";
    ctx.stroke();
    ctx.beginPath();
    lineWidth = RDM(15);
    ctx.ellipse(0, 0, 150, 390, RDM(360) * PI / 180, 0, 2 * PI);
    ctx.lineWidth = lineWidth * 4;
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(25,25,255,0.7)";
    ctx.stroke();
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = "rgba(0, 100, 0, 0.6 )";
    ctx.stroke();
    ctx.beginPath();
    ctx.filter = "contrast(300%)";
    lineWidth = RDM(30);
    ctx.ellipse(RDM(width / 2), RDM(height / 2), RDM(260), RDM(320), RDM(360) * PI / 180, 0, 2 * PI);
    ctx.lineWidth = lineWidth * 4;
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.stroke();
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6 )";
    ctx.stroke();
    ctx.beginPath();
    ctx.filter = "blur(" + RDM(50) + "px)";
    lineWidth = RDM(60);
    ctx.ellipse(circle.x, circle.y, circle.radius, RDM(320), RDM(360) * PI / 180, 0, 2 * PI);
    ctx.lineWidth = lineWidth * 4;
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(205,255,255,0.7)";
    ctx.stroke();
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6 )";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-width, -height);
    ctx.lineCap = "round";
    ctx.filter = "blur(" + RDM(50) + "px)";
    ctx.bezierCurveTo(RDM(width) / 2, RDM(height) / 2, RDM(-width), RDM(-height), circle.x, circle.y);
    lineWidth = RDM(54);
    ctx.lineWidth = lineWidth * 4;
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(205,255,255,0.7)";
    ctx.stroke();
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6 )";
    ctx.stroke();
    ctx.beginPath();
    ctx.filter = "saturate(300%)";
    var newAngle = Math.floor(RDM(anglePoints.length));
    var newX = circle.x + circle.radius * Math.sin(anglePoints[newAngle]);
    var newY = circle.y + circle.radius * Math.cos(anglePoints[newAngle]);
    ctx.moveTo(newX, newY);
    ctx.lineCap = "round";
    ctx.bezierCurveTo(RDM(-width) / 2, RDM(-height) / 2, RDM(width) / 2, RDM(height) / 2, -width / 2, height / 2);
    lineWidth = RDM(24);
    ctx.lineWidth = lineWidth * 4;
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(205,255,255,0.7)";
    ctx.stroke();
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6 )";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(newX, newY);
    ctx.lineCap = "round";
    ctx.bezierCurveTo(RDM(width) / 2, RDM(height) / 2, RDM(-width) / 2, RDM(-height), width / 2, RDM(-height) / 2);
    lineWidth = RDM(12);
    ctx.lineWidth = lineWidth * 4;
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(205,255,255,0.7)";
    ctx.stroke();
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6 )";
    ctx.stroke();
    ctx.beginPath();
    var newAngle2 = Math.floor(RDM(anglePoints.length));
    var newX2 = circle.x + circle.radius * Math.sin(anglePoints[newAngle2]);
    var newY2 = circle.y + circle.radius * Math.cos(anglePoints[newAngle2]);
    ctx.moveTo(newX2, newY2);
    ctx.lineCap = "round";
    ctx.bezierCurveTo(RDM(-width) / 2, RDM(-height) / 2, RDM(-width) / 2, RDM(-height), width / 2, RDM(height) / 2);
    lineWidth = RDM(32);
    ctx.lineWidth = lineWidth * 4;
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(25,255,25,0.7)";
    ctx.stroke();
    ctx.lineWidth = lineWidth * 0.5;
    ctx.strokeStyle = "rgba(60, 60, 60, 0.6 )";
    ctx.stroke();
    ctx.closePath();
}

function reset() {
    totalCircles = [];
    iterations = 0;
    extendAmount = 1.04;
    blurAmount = 0;
    initialRadius = 2;
    initialRadius2 = 1;
    newRadius = 10;
    width = window.innerWidth;
    height = window.innerHeight;
    positionX = 0;
    positionY = 0;
    x = 0;
    lineWidth = 1;
    frameRate = 10;
    canvas = document.getElementById("paintSurface");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.translate(width / 2, height / 2);
    runCheck();
}
reset();