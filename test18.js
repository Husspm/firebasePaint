function setup() {
    w = window.innerWidth - 20;
    h = window.innerHeight - 20;
    createCanvas(w, h);
    background(0);
    for (var x = 0; x < w; x += w / notes[0].note.length) {
        stroke(250, 70);
        strokeWeight(10);
        line(x, 0, x, h);
        notes[0].points.x.push(x);
        notes[1].points.x.push(x);
    }
    for (var y = 0; y < h; y += h / noteLength.length) {
        stroke(250, 70);
        strokeWeight(10);
        line(0, y, w, y);
        notes[0].points.y.push(y);
        notes[1].points.y.push(y);
    }
}

function touchMoved() {
    strokeWeight(10);
    stroke(20, 170);
    fill(200, 200);
    ellipse(mouseX, mouseY, 60, 50);
    return false;
}
var notes = [{
        note: [48, 50, 52, 54, 55, 57, 59],
        points: { x: [], y: [] }
    },
    {
        note: [60, 62, 64, 66, 67, 69, 71],
        points: { x: [], y: [] }
    }
];
var noteLength = ['12n', '8n'];
var reverb = new Tone.JCReverb(0.55);
var synth = new Tone.Synth({
    oscialltor: {
        type: 'sine'
    },
    envelope: {
        attack: 0.05,
        decay: 0.15,
        sustain: 0.5,
        release: 0.5
    }
}).chain(reverb, Tone.Master);

function mousePressed() {
    var lengthToPlay = Math.floor(map(mouseY, 0, h, 0, noteLength.length));
    if (lengthToPlay === 0) {
        var noteToPlay = Math.floor(map(mouseX, 0, w, 0, notes[0].note.length));
    } else {
        var noteToPlay = Math.floor(map(mouseX, 0, w, 0, notes[1].note.length));
    }
    var playNote = midiToFreq(notes[lengthToPlay].note[noteToPlay]);
    synth.triggerAttackRelease(playNote, noteLength[lengthToPlay], '+0.05', 0.5);
    strokeWeight(10);
    stroke(20, 170);
    fill(200, 200);
    rect(notes[lengthToPlay].points.x[noteToPlay], notes[lengthToPlay].points.y[lengthToPlay], notes[lengthToPlay].points.x[noteToPlay + 1], notes[lengthToPlay].points.y[lengthToPlay + 1]);
}