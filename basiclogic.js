var colors = { mode: "rgba(", red: "50,", green: "50,", blue: "50,", alpha: "1)" };
var blurAmount = 0;
//slider controls from custom colors
$("input[type='range']").on("input", function() {
    if (this.id === "alpha") {
        colors[this.id] = this.value + ")";
    } else if (this.id === "pixelate") {
        blurAmount = this.value;
    } else {
        colors[this.id] = this.value + ",";
    }
    //dipslays current color in preview window
    $("#colorPreview").css("background-color", colors.mode + colors.red + colors.green + colors.blue + colors.alpha);
}); //ends slider function
//shows or hides the color options
$("#colorHider").click(function displayToggle() {
    $(".colorBox,  .colorSelector").toggleClass("hide");
}); //ends dipslay toggle function, ! might need to reuse it later for other options
//randomizer generates random colors. ! might need to reuse later too 
$("#randomize").click(function randomizer() {
    for (var key in colors) {
        var newNumber = Math.floor(Math.random() * 255);
        console.log(newNumber);
        if (key !== "mode")
            colors[key] = newNumber + ",";
        if (key === "alpha") {
            newNumber = Math.random();
            colors[key] = newNumber + ")";
        }
    }
    $("#colorPreview").css("background-color", colors.mode + colors.red + colors.green + colors.blue + colors.alpha);
});
//setting up the canvas
var canvas = document.getElementById("paintSurface");
var ctx = canvas.getContext("2d");
console.log(ctx);
ctx.canvas.height = 600;
ctx.canvas.width = 800;
ctx.canvas.style.filter = "brightness(200%)";
$("#reset").click(function() {
    canvas = document.getElementById("paintSurface");
    ctx = canvas.getContext("2d");
    console.log(ctx);
    ctx.canvas.height = 600;
    ctx.canvas.width = 800;
    ctx.canvas.style.filter = "brightness(200%)";
});
$("#paintSurface").mousemove(function(event) {
    ctx.filter = "blur(" + blurAmount + "px)";
    posX = event.clientX - $(event.target).offset().left;
    posY = event.clientY - $(event.target).offset().top;
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.arc(posX, posY, 40, 0, 2 * Math.PI);
    ctx.strokeStyle = colors.mode + colors.red + colors.green + colors.blue + colors.alpha;
    ctx.fillStyle = "rgba(0,0,0, 0.6)";
    ctx.fill();
    ctx.stroke();

});