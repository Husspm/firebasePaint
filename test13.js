var notes = [
    60,
    62,
    63,
    67,
    69,
    70,
    72,
    74,
    75,
    79,
    81,
    82,
    84
];
var w = window.innerWidth - 6.5;
var h = window.innerHeight - 6.5;

function setup() {
    createCanvas(w, h);
    osc1 = new p5.Oscillator();
    delay1 = new p5.Delay();
    reverb1 = new p5.Reverb();
    env1 = new p5.Env();
    osc1.disconnect();
    osc1.connect(delay1);
    env1.setInput(osc1);
    env1.setRange(0.8, 0);
    env1.setADSR(0.05, 0.1, 0, 0.05);
    delay1.delayTime(0.75);
    delay1.feedback(0.4);
    reverb1.set(9, 90);
    delay1.connect(reverb1);
    osc1.start();
}
var auto = setInterval(function () {
    computerMakeMusic();
}, 1000 / 16);
var iterations = 1;

function computerMakeMusic() {
    if (iterations === 1) {
        osc1.freq(midiToFreq(notes[Math.floor(random(notes.length))]));
        env1.play();
    }
    if (iterations === 17) {
        osc1.freq(midiToFreq(notes[Math.floor(random(notes.length))] - 12));
        env1.play();
    }
    if (iterations === 25) {
        osc1.freq(midiToFreq(notes[Math.floor(random(notes.length))] + 12));
        env1.play();
    }
    iterations++;
    if (iterations > 32) {
        iterations = 1;
    }
}