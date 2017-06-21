var w = window.innerWidth,
    h = window.innerHeight,
    photoArray = [];

function makeArray() {
    for (let num = 1; num <= 93; num += 1) {
        let photo = "image" + num + ".png";
        photoArray.push(photo);
        console.log(photoArray);
    }
}
makeArray();

function setup() {
    createCanvas(w, h - 6.5);
    frameRate(120);
    amount = 0;
    $("#canvasImg").css({"width": w, "height": h});
    $("#canvasImg2").css({"width": w, "height": h});
    mic = new p5.AudioIn();
    mic.start();
    noLoop();
}
var xOff = 0;

var iterations = 0;

var auto = setInterval(function () {
    listen();
}, 8);

function listen() {
    micLevel = mic.getLevel();
    if (micLevel < 0.095) {
        noLoop();
        amount += 0.2;
        if (amount > 50) {
            amount += 0.05;
        }
        $("#canvasImg").css("filter", "blur(" + amount + "px) contrast(" + amount * 5 + ")");
        $("#canvasImg2").css("filter", "blur(" + amount + "px) contrast(" + amount * 5 + ")");
    } else {
        amount = 0;
        loop();
    }
}

function draw() {
    iterations++;
    $("#canvasImg").attr("src", "./images/" + photoArray[Math.floor(random(photoArray.length))]);
    $("#canvasImg").css("opacity", random(0.2, 0.8));
    $("#canvasImg2").attr("src", "./images/" + photoArray[Math.floor(random(photoArray.length))]);
    $("#canvasImg2").css("opacity", random(0.2, 0.8));
    strokeWeight(random(0, 3));
    triangle(random(0, w), random(0, h), random(0, w), random(0, h), random(0, w), random(0, h));
    ellipse(random(0, w), random(0, h), 200, random(0, w));
    quad(random(0, w), random(0, h), random(0, w), random(0, h), random(0, w), random(0, h), random(0, w), random(0, h));
    xOff = xOff + 0.01;
    var n = noise(xOff) * random(0, 20);
    var s = noise(xOff) * random(0, 255);
    stroke(s);
    $("#defaultCanvas0").css("filter", "blur(" + n + "px)");
    $("#canvasImg").css("filter", "contrast(" + n * 10 + ")");
    $("#canvasImg2").css("filter", "contrast(" + n * 10 + ")");
    noFill();
}