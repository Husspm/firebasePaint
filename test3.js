// declaring my own random number function to avoid writing Math.random() * x all the time

var RDM = function(max) {
    var newRND = Math.random() * max;
    return newRND;
};

//declaring some mathy variables

PI = Math.PI;

var colors = [
    { mode: "rgba(", red: "250,", green: "250,", blue: "250,", alpha: "0.9)" },
    { mode: "rgba(", red: "20,", green: "20,", blue: "20,", alpha: "0.9)" }
];

var clrIdx = 0;
var clrTarget = ["border-color", "background-color"];
$("select").change(function() {
    clrIdx = this.value;
});
//slider controls for custom colors
$("input[type='range']").on("input", function() {
    if (this.id === "alpha") {
        colors[clrIdx][this.id] = this.value + ")";
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

var width = 800;
var height = 700;
var canvas = document.getElementById("paintSurface");
var ctx = canvas.getContext("2d");
var brightnessAmount = 200;
ctx.canvas.height = height;
ctx.canvas.width = width;
console.log(ctx);
ctx.canvas.style.filter = "contrast(" + brightnessAmount + "%)";
ctx.globalCompositeOperation = 'destination-over';
$("#reset").click(function() {
    totalCircles = [];
    blurAmount = 0;
    width = 1600;
    height = 900;
    positionX = 0;
    positionY = 0;
    posX = 0;
    runCheck();
    canvas = document.getElementById("paintSurface");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.filter = "contrast(" + brightnessAmount + "%)";
    //ctx.globalCompositeOperation = 'destination-over';
});

var blurAmount = 0;
var auto = setInterval(function() { computerMakeArt(); }, 1000 / frameRate);
var circle = new Circle(RDM(width), RDM(height), RDM(2000));
var totalCircles = [];
var running = false;

function runCheck() {
    if (running === true) {
        clearInterval(auto);
        running = false;
    } else {
        auto = setInterval(function() { computerMakeArt(); }, 1000 / frameRate);
        running = true;
    }
}
var frameRate = 60;

function keepTrack(max) {
    if (totalCircles.length === max) {
        clearInterval(auto);
        running = false;
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


var posX = 0;
var posY = 0;
var anglePoints = [0, 0.25 * PI, 0.5 * PI, 0.75 * PI, PI, 1.25 * PI, 1.5 * PI, 1.75 * PI, 2 * PI];

function computerMakeArt() {
    var circle = new Circle(RDM(width) * 2, RDM(height), RDM(2000), anglePoints);
    circle.save();
    running = true;
    if (totalCircles.length % 2 === 0) {
        randomizer();
        if (clrIdx === 0) {
            clrIdx = 1;
        } else {
            clrIdx = 0;
        }
    }
    keepTrack(300);
    for (var i = totalCircles.length - 1; i >= (totalCircles.length - 2); i--) {
        ctx.beginPath();
        posX += 4;
        if (posX > width) {
            posX = 0;
        }
        posY += 4;
        if (posY > width) {
            posY = 0;
        }
        ctx.lineWidth = RDM(8);
        //ctx.ellipse(totalCircles[i].posX, totalCircles[i].posY, totalCircles[i].radius, totalCircles[i].radius, 45 * Math.PI / 180, 0, Math.PI * 2);
        ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
        var randomPointX = totalCircles[i].posX + totalCircles[i].radius * Math.cos(totalCircles[i].angles[3]);
        var randomPointY = totalCircles[i].posY + totalCircles[i].radius * Math.sin(totalCircles[i].angles[3]);
        ctx.moveTo(RDM(width), RDM(height));
        ctx.quadraticCurveTo(randomPointX, randomPointY, posX, height);
        ctx.quadraticCurveTo(randomPointX, randomPointY, posX, 0);
        ctx.quadraticCurveTo(randomPointX, randomPointY, 0, posY);
        ctx.quadraticCurveTo(randomPointX, randomPointY, width, posY);
        ctx.stroke();
        ctx.lineWidth = RDM(10);
        ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
        ctx.stroke();
        ctx.lineWidth = RDM(13);
        ctx.strokeStyle = "rgba(10, 10, 10, 0.6)";
        ctx.stroke();
        ctx.lineWidth = RDM(2);
        ctx.strokeStyle = "rgba(210, 210, 210, 0.9)";
        ctx.stroke();
        ctx.closePath();
    }
}

function Circle(x, y, radius, angles) {
    this.angles = angles;
    this.posX = x;
    this.posY = y;
    this.endX = x + 20;
    this.endY = y + 20;
    this.radius = radius;
    this.save = function() {
        totalCircles.push(this);
    };
}