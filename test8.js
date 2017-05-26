w = window.innerWidth;
h = window.innerHeight;
var photoArray = [];

function makeArray() {
    for (var num = 1; num <= 49; num += 1) {
        var photo = "image" + num;
        photoArray.push(photo);
        console.log(photoArray);
    }
}
makeArray();

function keepTrack(max) {
    if (iterations > max) {
        var dataURL = canvas.toDataURL();
        document.getElementById('canvasImg3').src = dataURL;
        noLoop();

    }

}

function setup() {
    createCanvas(w, h - 6.5);
    frameRate(30);
    $("#canvasImg").css({ "width": w, "height": h });
    $("#canvasImg2").css({ "width": w, "height": h });
}
var xOff = 0;

var iterations = 0;

function draw() {
    iterations++;
    keepTrack(300);
    $("#canvasImg").attr("src", "./images/" + photoArray[Math.floor(random(photoArray.length))] + ".png");
    $("#canvasImg").css("opacity", random(0.3, 1));
    $("#canvasImg2").attr("src", "./images/" + photoArray[Math.floor(random(photoArray.length))] + ".png");
    $("#canvasImg2").css("opacity", random(0.3, 1));
    triangle(random(0, w), random(0, h), random(0, w), random(0, h), random(0, w), random(0, h));
    ellipse(random(0, w), random(0, h), 200, random(0, w));
    quad(random(0, w), random(0, h), random(0, w), random(0, h), random(0, w), random(0, h), random(0, w), random(0, h));
    strokeWeight(random(0, 10));
    xOff = xOff + 0.01;
    var n = noise(xOff) * random(0, 200);
    var s = noise(xOff) * random(0, 255);
    stroke(s);
    $("#defaultCanvas0").css("filter", "blur(" + n + "px)");
    $("#canvasImg").css("filter", "contrast(" + n + ")");
    $("#canvasImg2").css("filter", "grayscale(" + n + ")");
    fill(random(0, 255));
}