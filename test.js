// declaring my own random number function to avoid writing Math.random() * x all the time
var RDM = function(max) {
    var newRND = Math.random() * max;
    return newRND;
};
var colors = [
    { mode: "rgba(", red: "250,", green: "250,", blue: "250,", alpha: "0.9)" },
    { mode: "rgba(", red: "20,", green: "20,", blue: "20,", alpha: "0.9)" }
];
var clrIdx = 0;
var clrTarget = ["border-color", "background-color"];
$("select").change(function() {
    clrIdx = this.value;
});
//slider controls from custom colors
$("input[type='range']").on("input", function() {
    if (this.id === "alpha") {
        colors[clrIdx][this.id] = this.value + ")";
    } else if (this.id === "pixelate") {
        blurAmount = this.value;
    } else {
        colors[clrIdx][this.id] = this.value + ",";
    }
    console.log(colors[clrIdx]);
    //dipslays current color in preview window
    $("#colorPreview").css(clrTarget[clrIdx], colors[clrIdx].mode + colors[clrIdx].red + colors[clrIdx].green + colors[clrIdx].blue + colors[clrIdx].alpha);
}); //ends slider function
//randomizer generates random colors. ! might need to reuse later too 
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
var brightnessAmount = 100;
ctx.canvas.height = height;
ctx.canvas.width = width;
console.log(ctx);
ctx.canvas.style.filter = "contrast(" + brightnessAmount + "%)";
ctx.globalCompositeOperation = 'destination-over';
$("#reset").click(function() {
    totalCircles = [];
    runCheck();
    canvas = document.getElementById("paintSurface");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.canvas.style.filter = "contrast(" + brightnessAmount + "%)";
});

var blurAmount = 0;
var auto = setInterval(function() { computerMakeArt(); }, 1000 / frameRate);
var circle = new Circle(RDM(width), RDM(height), RDM(200));
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
var positionX = 0;
var positionY = 0;

var blurAmount = 35;

function computerMakeArt() {
    running = true;
    //keepTrack(2800);
    if (totalCircles.length % (frameRate / 2) === 0) {
        randomizer();
        positionX = RDM(width);
        positionY += RDM(height);
        if (clrIdx === 0) {
            clrIdx = 1;
        } else {
            clrIdx = 0;
        }
    }
    //if (totalCircles.length > 500 === 0) {
    //    blurAmount = 0;
    //} else {
    //    blurAmount = 0;
    //}
    blurAmount = RDM(20);
    var circle = new Circle(RDM(width), RDM(height), RDM(600), RDM(2) * Math.PI);
    var circumX = positionX + circle.radius * Math.cos(circle.angle);
    var circumY = positionY + circle.radius * Math.sin(circle.angle);
    circle.save();
    ctx.beginPath();
    ctx.lineWidth = RDM(2);
    ctx.ellipse(positionX, positionY, circle.radius, circle.radius, 45 * Math.PI / 180, 0, 2 * Math.PI);
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.stroke();
    ctx.lineWidth = RDM(4);
    var newPoint = RDM(width);
    ctx.moveTo(circumX, circumY);
    ctx.quadraticCurveTo(newPoint, RDM(height), RDM(width), RDM(height));
    ctx.stroke();
    ctx.moveTo(circumX, circumY);
    ctx.quadraticCurveTo(newPoint, RDM(height), RDM(width), 0);
    ctx.quadraticCurveTo(RDM(width), RDM(height), RDM(width), RDM(height));
    ctx.lineWidth = RDM(4);
    var angle = Math.PI * RDM(2);
    //var angle2 = Math.PI * RDM(2);
    ctx.moveTo(circumX, circumY);
    ctx.quadraticCurveTo(RDM(width), RDM(height), circumX, circumY);
    //var circumX2 = positionX + circle.radius * Math.cos(angle2);
    //var circumY2 = positionY + circle.radius * Math.sin(angle2);
    //ctx.moveTo(circumX2, circumY2);
    //ctx.lineTo(positionX, positionY);
    //ctx.lineTo(RDM(width), newPoint);
    //ctx.lineTo(positionX, newPoint);
    //ctx.lineTo(positionX + circle.radius * 2, RDM(height));
    ctx.stroke();
    ctx.moveTo(0, RDM(height));
    ctx.quadraticCurveTo(newPoint, RDM(height), circumX, circumY);
    ctx.lineWidth = RDM(2);
    ctx.filter = "blur(" + blurAmount + "px)";
    ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.stroke();
    ctx.closePath();
    if (positionX > width) {
        positionX = 0;
    }
    if (positionY > height) {
        positionY = 0;
    }
    //console.log(positionX, positionY);
    ctx.moveTo(positionX, positionY);
}

function Circle(x, y, radius, angle) {
    this.angle = angle;
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.save = function() {
        totalCircles.push(this);
    };
}