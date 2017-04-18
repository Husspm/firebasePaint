// declaring my own random number function to avoid writing Math.random() * x all the time
var RDM = function(max) {
    var newRND = Math.random() * max;
    return newRND;
};
var colors = [
    { mode: "rgba(", red: "250,", green: "0,", blue: "0,", alpha: "1)" },
    { mode: "rgba(", red: "50,", green: "50,", blue: "50,", alpha: "0.2)" }
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
            colors[clrIdx][key] = Math.floor(RDM(255)) + ",";
        if (key === "alpha") {
            newNumber = RDM(1);
            colors[clrIdx][key] = newNumber + ")";
        }
    }
    $("#colorPreview").css(clrTarget[clrIdx], colors[clrIdx].mode + colors[clrIdx].red + colors[clrIdx].green + colors[clrIdx].blue + colors[clrIdx].alpha);
}
//setting up the canvas
var canvas = document.getElementById("paintSurface");
var ctx = canvas.getContext("2d");
var brightnessAmount = 120;
ctx.canvas.height = 700;
ctx.canvas.width = 800;
//ctx.canvas.style.filter = "brightness(" + brightnessAmount + "%)";
$("#reset").click(function() {
    canvas = document.getElementById("paintSurface");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = 700;
    ctx.canvas.width = 800;
    ctx.canvas.style.filter = "brightness(" + brightnessAmount + "%)";
});
/*
setInterval(function() {
    brightnessAmount = RDM(300);
    ctx.canvas.style.filter = "brightness(" + brightnessAmount + "%)";
}, 33.33);*/
var blurAmount = 0;
var auto = setInterval(function() { computerMakeArt(); }, 1000 / 20);

function computerMakeArt() {
    /*
    posX = event.clientX - $(event.target).offset().left;
    posY = event.clientY - $(event.target).offset().top;
    */
    ctx.beginPath();
    ctx.filter = "blur(" + blurAmount + "px)";
    posX = ctx.canvas.width / 2;
    posY = ctx.canvas.height;
    rdmX = RDM(ctx.canvas.width);
    rdmY = RDM(ctx.canvas.height);
    endPosX = RDM(ctx.canvas.width);
    endPosY = RDM(ctx.canvas.height);
    ctx.moveTo(posX, posY);
    // ctx.quadraticCurveTo(rdmX, endPosY, endPosX, rdmY);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    //ctx.arc(posX, posY, RDM(190), 0, 2 * Math.PI);
    ctx.moveTo(posX, 0);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(posX * 0.5, 0);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(ctx.canvas.width * 0.75, 0);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(posX * 0.5, posY);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(ctx.canvas.width * 0.75, posY);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(0, posY / 2);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(ctx.canvas.width, posY / 2);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(0, posY / 4);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(ctx.canvas.width, posY / 4);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(0, posY * 0.75);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    ctx.moveTo(ctx.canvas.width, posY * 0.75);
    ctx.quadraticCurveTo(endPosX, endPosY, rdmX, rdmY);
    //ctx.arc(endPosX, endPosY, RDM(190), 0, 2 * Math.PI);
    ctx.lineWidth = RDM(8);
    ctx.strokeStyle = colors[0].mode + colors[0].red + colors[0].green + colors[0].blue + colors[0].alpha;
    ctx.fillStyle = colors[1].mode + colors[1].red + colors[1].green + colors[1].blue + colors[1].alpha;
    ctx.fill();
    ctx.stroke();
}