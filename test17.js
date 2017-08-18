var w = 800;
var h = 600;

function RDM(min, max) {
    var rV = random(min, max);
    return rV;
}

function setup() {
    createCanvas(w, h);
    background(0);
}
var grid = [];

function createGridPoints() {
    for (var x = 0; x < w + 100; x += 100) {
        for (var y = 0; y < h + 100; y += 100) {
            obj = {};
            obj.x = x;
            obj.y = y;
            grid.push(obj);
        }
    }
}
createGridPoints();
xOff = 0;

function draw() {
    for (var i = 0; i < grid.length; i++) {
        noFill();
        xOff += 0.01;
        curveTightness(RDM(-15, 15))
        stroke(RDM(0, 255));
        strokeWeight(noise(xOff) * 6);
        curve(0, 0, grid[i].x, grid[i].y, w + RDM(-100, 100), h + RDM(-200, 200), grid[i].x + RDM(-60, 60), grid[i].y + RDM(-80, 80));
    }
}