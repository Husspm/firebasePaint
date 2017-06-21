var w = window.innerWidth,
    h = window.innerHeight,
    photoArray = [],
    xGrid = [],
    yGrid = [];

function makeArray() {
    for (let num = 1; num <= 64; num += 1) {
        let photo = "image" + num;
        photoArray.push(photo);
        console.log(photoArray);
    }
}

function makeGrid() {
    for (let num = 0; num <= w; num += 10) {
        xGrid.push(num);
    }
    for (let num = 0; num <= h; num += 10) {
        yGrid.push(num);
    }
}
makeArray();
makeGrid();

function setup() {
    createCanvas(w, h - 6.5);
    frameRate(120);
    $("#canvasImg").css({"width": w, "height": h});
    $("#canvasImg2").css({"width": w, "height": h});
}
var xOff = 0;

var xIterations = 0,
    yIterations = 0,
    printIterations = 0;

function draw() {
    printIterations++;
    keepTrack(3900);
    xIterations += random(0.2, 29.5);
    yIterations += random(0.2, 28.9);
    if (xIterations >= w) {
        xIterations = 0;
    }

    if (yIterations >= h) {
        yIterations = 0;
    }
    push();
    var sWgt = random(0, 5);
    strokeWeight(sWgt);
    var radius = random(20, 860);
    var radius2 = random(29, 860);
    // ellipse(w / 2, h / 2, radius, radius2); ellipse(random(0, w), random(0, h),
    // random(0, h), random(0, w));
    xOff = xOff + 0.01;
    var n = noise(xOff) * random(0, 255);
    var s = noise(xOff) * random(0, 255);
    stroke(s);
    noFill();
    push();
    strokeWeight(sWgt / 2);
    //ellipse(w / 2, h / 2, radius, radius2);
    stroke(random(0, 255));
    noFill();
    push();
    strokeWeight(sWgt / 3);
    //ellipse(w / 2, h / 2, radius, radius2);
    stroke(random(0, 255));
    noFill();
    push();
    ellipseMode(RADIUS);
    strokeWeight(sWgt);
    ellipse(w / 2, h / 2, xIterations, yIterations);
    stroke(random(0, 255), random(0, 255), random(0, 255), random(0, 1));
    stroke(random(0, 255));
    noFill();
    push();
    strokeWeight(sWgt / 2);
    stroke(random(0, 255), random(0, 255), random(0, 255), random(0, 1));
    ellipse(w / 2, h / 2, yIterations, xIterations);
    noFill();
    pop();
}

function keepTrack(max) {
    if (printIterations > max) {
        var dataURL = canvas.toDataURL();
        document
            .getElementById('canvasImg3')
            .src = dataURL;
        noLoop();

    }

}