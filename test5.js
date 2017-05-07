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

$("#reset").click(reset);


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
    posX = 0;
    lineWidth = 1;
    frameRate = 120;
    runCheck();
    canvas = document.getElementById("paintSurface");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = height;
    ctx.canvas.width = width;
}

var blurAmount = 0;
var totalCircles = [];
var running = false;

function runCheck() {
    if (running === true) {
        clearInterval(auto);
        running = false;
    } else {
        auto = setInterval(function() { computerMakeArt(); }, 1000 / 120);
        running = true;
    }
}
var frameRate = 60;

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

function changeRoutine(changer) {
    switch (changer) {
        case 0:
            clearInterval(auto);
            auto = setInterval(function() { computerMakeArt(); }, 1000 / 60);
            break;
        case 1:
            clearInterval(auto);
            auto = setInterval(function() { computerMakeArt2(); }, 1000 / 60);
            break;
        case 2:
            clearInterval(auto);
            auto = setInterval(function() { computerMakeArt3(); }, 1000 / 60);
            break;
    }
}
var auto = setInterval(function() { computerMakeArt(); }, 1000 / 120);

function computerMakeArt() {
    //keepTrack(166);
    var gridAmount = RDM(80, 140) + 50;
    var xPoints = [];
    var yPoints = [];
    for (var x1 = 0; x1 <= width; x1 += gridAmount) {
        xPoints.push(x1);
    }
    for (var y1 = 0; y1 <= height; y1 += gridAmount) {
        yPoints.push(y1);
    }
    iterations++;
    running = true;
    if (iterations % 1 === 0) {
        randomizer();
        if (clrIdx === 0) {
            clrIdx = 1;
        } else {
            clrIdx = 0;
        }
    }
    for (var y = 0; y <= yPoints.length - 1; y++) {
        for (var x = 0; x <= xPoints.length - 1; x++) {
            ctx.beginPath();
            ctx.lineJoin = "round";
            ctx.moveTo(xPoints[x], yPoints[y]);
            ctx.lineWidth = RDM(28, 0.6);
            ctx.lineTo(xPoints[x + 1] * RDM(1, 3), yPoints[y] * RDM(40, 2000));
            ctx.lineTo(xPoints[x], yPoints[y + 1]);
            ctx.lineTo(xPoints[x] + 1, yPoints[y] + 1);
            ctx.lineTo(xPoints[x + 1], yPoints[y]);
            ctx.lineTo(xPoints[x] + 2, yPoints[y]);
            ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
            ctx.stroke();
            ctx.lineWidth = RDM(42, 0.8);
            ctx.strokeStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
            ctx.stroke();
        }
        ctx.lineWidth = RDM(56, 0.8);
        ctx.lineTo(xPoints[y + 1], yPoints[y]);
        ctx.strokeStyle = "rgba(" + RDM(244) + RDM(233) + RDM(233) + "0.5)";
        ctx.stroke();
    }
}