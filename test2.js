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
    blurAmount = 0;
    width = 800;
    height = 600;
    positionX = 0;
    positionY = 0;
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
var positionX = width / 2;
var positionY = height / 2;

var blurAmount = 0;


function computerMakeArt() {
    linewidth = RDM(10);
    running = true;
    keepTrack(1600);
    if (totalCircles.length % frameRate === 0) {
        //randomizer();
        //positionX = RDM(width);
        //positionY = RDM(height);
        //if (clrIdx === 0) {
        //    clrIdx = 1;
        //} else {
        //    clrIdx = 0;
        //}
    }
    positionX += 5;
    positionY += 40;
    var circle = new Circle(RDM(width), RDM(height), RDM(60), RDM(2) * Math.PI);
    var circumX = positionX + circle.radius * Math.cos(circle.angle);
    var circumY = positionY + circle.radius * Math.sin(circle.angle);
    circle.save();
    ctx.beginPath();
    randomX = RDM(width);
    randomY = RDM(height);
    ctx.lineWidth = linewidth;
    ctx.moveTo(width / 2, height);
    ctx.quadraticCurveTo(RDM(width), RDM(height), randomX, randomY);
    ctx.stroke();
    ctx.moveTo(randomX, randomY);
    randomX = RDM(width);
    randomY = RDM(height);
    ctx.lineWidth = linewidth * 4;
    ctx.quadraticCurveTo(RDM(width), RDM(height), randomX, randomY);
    ctx.stroke();
    ctx.moveTo(randomX, randomY);
    randomX = RDM(width);
    randomY = RDM(height);
    ctx.quadraticCurveTo(RDM(width), RDM(height), randomX, randomY);
    ctx.moveTo(randomX, randomY);
    ctx.quadraticCurveTo(RDM(width), RDM(height), (width) += 0.5, height / 2);
    ctx.ellipse(positionX, positionY, circle.radius, circle.radius, 45 * Math.PI / 180, 0, 2 * Math.PI);
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.lineWidth = linewidth;
    var newPoint = RDM(width);
    ctx.moveTo(circumX, circumY);
    ctx.quadraticCurveTo(newPoint, RDM(height), width * 0.5, height * 1);
    ctx.stroke();
    ctx.moveTo(circumX, circumY);
    ctx.quadraticCurveTo(newPoint, RDM(height), width * 0.25, 0);
    ctx.quadraticCurveTo(RDM(width), RDM(height), width * 0.25, height += 0.2);
    ctx.lineWidth = linewidth * 2;
    var angle = Math.PI * RDM(2);
    var angle2 = Math.PI * RDM(2);
    ctx.moveTo(circumX, circumY);
    ctx.quadraticCurveTo(RDM(width), RDM(height), circumX, circumY);
    var circumX2 = positionX + circle.radius * Math.cos(angle2);
    var circumY2 = positionY + circle.radius * Math.sin(angle2);
    ctx.moveTo(circumX2, circumY2);
    ctx.lineTo(positionX, positionY);
    ctx.lineTo(RDM(width), newPoint);
    ctx.lineTo(positionX, newPoint);
    ctx.lineTo(positionX + circle.radius * 2, RDM(height));
    ctx.stroke();
    ctx.moveTo(0, RDM(height));
    ctx.quadraticCurveTo(newPoint, RDM(height), circumX, circumY);
    ctx.lineWidth = linewidth;
    ctx.filter = "blur(" + (blurAmount) + "px)";
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
    //ctx.moveTo(positionX, positionY);
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