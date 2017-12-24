var w = window.innerWidth,
    h = window.innerHeight,
    photoArray = [],
    photoArray2 = [];
//creates Image arrays upon request and initialization
function makeArray(number, selector) {
    endNumber = number + 15;
    for (let num = number; num <= endNumber; num += 1) {
        let photo = "image" + num + ".png";
        if (selector === 0) {
            photoArray.push(photo);
        } else {
            photoArray2.push(photo);
        }
    }
}
//initial calls to makeArray to have a starting point for photoArray & photoArray2
makeArray(1, 0);
makeArray(listLength, 1);
//p5 setup function to initialize canvas and image heights to match canvas
function setup() {
    createCanvas(w, h);
    $("#canvasImg").css({ "width": w, "height": h });
    $("#canvasImg2").css({ "width": w, "height": h });
    $("#canvasImg3").css({ "width": w, "height": h });
    mic = new p5.AudioIn();
    mic.start();
}
//start of controlling variables for noise values, listLength values for photoArray and color values
var offset = 0,
    offset2 = 0,
    imageOneSelected = true,
    counter = 0,
    listLength = 94,
    redMin = 160,
    redMax = 210,
    videoClips = [
        'videoThree',
        'videoFour',
        'videoFive'
    ],
    vid = document.getElementById('bgVid');
//ends controlling variables
var listen = setInterval(function() {
    var vol = mic.getLevel();
    offset = offset + 0.01;
    offset2 = offset2 + 0.05;
    var n = noise(offset);
    var n2 = noise(offset2);
    $("body").css('filter', 'blur(' + n2 * 35 + "px) contrast(" + n * (850 * (vol * 10) + 50) + "%)");
    $("#canvasImg").css({ "filter": "contrast(" + n * 230 + "%)", 'left': n * random(-200, 200), 'top': n * random(-30, 30), 'opacity': n * 1 });
    $("#canvasImg2").css({ "filter": "contrast(" + n2 * 230 + "%)", 'left': n2 * random(-20, 20), 'top': n2 * random(-300, 300), 'opacity': n2 * 1 });
    $("#canvasImg3").css({ "filter": "invert(" + n2 * 230 + "%)", 'left': n * random(-150, 150), 'top': n * random(-200, 150), 'opacity': n * 1 });
    $('video').css('opacity', random(0.11, 0.73));
    noStroke();
    //fill(n2 * 255, n * 255, n * 245, 10);
    fill(vol * 1000, 8);
    ellipse(random(0, w), random(0, h), random(300, 800));
    push();
    fill(random(redMin, redMax), random(255), random(255), 10);
    rect(random(0, w / 2), random(0, h / 2), random(0, w), random(0, h));
    pop();
    if (vol > 0.1) {
        counter++;
        iteration = 6;
        if (counter % iteration === 0) {
            changeImage();
            if (imageOneSelected === true) {
                imageOneSelected = false;
            } else {
                imageOneSelected = true;
            }
        }
    }
}, 4);

function changeImage() {
    if (imageOneSelected === true) {
        imgIndexA = Math.floor(random(photoArray.length));
        $("#canvasImg").attr("src", "./images/" + photoArray[imgIndexA]);
        photoArray.splice(imgIndexA, 1);
    } else {
        imgIndexB = Math.floor(random(photoArray2.length));
        $("#canvasImg2").attr("src", "./images/" + photoArray2[imgIndexB]);
        $("#canvasImg3").attr("src", "./images/" + photoArray2[imgIndexB]);
        photoArray2.splice(imgIndexB, 1);
    }
    if (photoArray.length === 0) {
        makeArray(Math.floor(random(1, listLength)), 0);
        iteration = Math.floor(random(4, 16));
    }
    if (photoArray2.length === 0) {
        makeArray(Math.floor(random(1, listLength)), 1);
        iteration = Math.floor(random(4, 16));
    }
}
//start of experimental section of using computer keyboard to adjust values. 
function keyPressed() {
    switch (key) {
        case 'A':
            {
                redMin = 0;
                redMax = 255;
                videoFile = videoClips[Math.floor(random(videoClips.length))];
                console.log(videoFile);
                vid.src = './images/' + videoFile + '.mp4';
                vid.play();
                break;
            }
        case 'S':
            {
                redMin = 160;
                redMax = 210;
                break;
            }
    }
}
//change made to make better github commit