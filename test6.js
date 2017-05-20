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
var frameRate = 60;

function runCheck() {
    if (running === true) {
        clearInterval(auto);
        running = false;
    } else {
        auto = setInterval(function() { computerMakeArt(); }, 1000 / 60);
        running = true;
    }
}

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
    for (var points = 0; points <= 3; points += (RDM(1.6) + 0.1)) {
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
    var circle = new Circle((width / 2), (height / 2), RDM(width) * 0.6);
    var circle2 = new Circle((width / 2), (height / 2), RDM(width) * 0.6);
    totalCircles.push(circle);
    totalCircles.push(circle2);
    for (var i = totalCircles.length - 1; i >= (totalCircles.length - 3); i--) {
        for (var index = 0; index <= anglePoints.length; index++) {
            var startX = totalCircles[i].x + totalCircles[i].radius * Math.cos(anglePoints[index]);
            var startY = totalCircles[i].y + totalCircles[i].radius * Math.sin(anglePoints[index]);
            var innerX = totalCircles[i].x + (totalCircles[i].radius) * Math.cos(anglePoints[index]);
            var innerY = totalCircles[i].y + (totalCircles[i].radius) * Math.sin(anglePoints[index]);
            var innerX2 = totalCircles[i].x + (totalCircles[i - 1].radius) * Math.cos(anglePoints[index + Math.floor(RDM(3))]);
            var innerY2 = totalCircles[i].y + (totalCircles[i - 1].radius) * Math.sin(anglePoints[index + Math.floor(RDM(3))]);
            var innerX3 = totalCircles[i].x + (totalCircles[i].radius / 3) * Math.cos(anglePoints[index]);
            var innerY3 = totalCircles[i].y + (totalCircles[i].radius / 3) * Math.sin(anglePoints[index]);
            var endX = totalCircles[i].x + totalCircles[i].radius * Math.cos(anglePoints[index + 1]);
            var endY = totalCircles[i].y + totalCircles[i].radius * Math.sin(anglePoints[index + 1]);
            ctx.beginPath();
            lineWidth = RDM(22.5);
            ctx.moveTo(startX, startY);
            //ctx.ellipse(totalCircles[i].x, totalCircles[i].y, totalCircles[i].radius, totalCircles[i].radius, 45 * PI / 180, 0, 2 * PI);
            ctx.bezierCurveTo(innerX, innerY, innerX2, innerY2, endX, endY);
            ctx.bezierCurveTo(innerX2, innerY2, innerX3, innerY3, endX, endY);
            ctx.quadraticCurveTo(RDM(width), 0, RDM(width), height);
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
            ctx.closePath();
        }
    }
    totalCircles = [];
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
    runCheck();
}
reset();