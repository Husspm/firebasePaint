var colors = { mode: "rgba(", red: "50,", green: "50,", blue: "50,", alpha: "1)" };
//slider controls from custom colors
$("input[type='range']").mousemove(function() {
    var tint = this.id;
    var shade;
    if (tint === "alpha") {
        shade = this.value + ")";
    } else {
        shade = this.value + ",";
    }
    colors[tint] = shade;
    console.log(colors);
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
ctx.filter = "blur(50px)";
$("#paintSurface").mousemove(function(event) {
    ctx.beginPath();
    ctx.moveTo(event.clientX - $(event.target).offset().left, event.clientY - $(event.target).offset().top);
    ctx.lineTo(event.clientX - $(event.target).offset().left + 5, event.clientY - $(event.target).offset().top + 5);
    ctx.lineWidth = 20;
    ctx.strokeStyle = colors.mode + colors.red + colors.green + colors.blue + colors.alpha;
    ctx.stroke();
});