var notes = [60,62,64,67,69,71,72,74,76,79,81,83,84];
var bassNotes = [36, 43, 48, 55, 60];
Synths = [];

function Synth() {}

function makeOSC() {
    for (var index = 1; index <= 8; index++) {
        var synth = new p5.SinOsc();
        var reverb = new p5.Reverb();
        var env = new p5.Env();
        env.setRange(0.5, 0);
        env.setADSR(0.5, 0.5, 0, 0.5);
        synth.disconnect();
        synth.connect(reverb);
        synth.amp(env);
        synth.start();
        Synths.push(synth);
    }
    console.log(Synths);
}
makeOSC();
var w = window.innerWidth - 6.5;
var h = window.innerHeight - 6.5;
//initializing oscillators, delays, reverb, filter, and envelopes
function setup() {
    createCanvas(w, h);
    background(0);
    osc1 = new p5.SinOsc();
    osc2 = new p5.TriOsc();
    osc3 = new p5.TriOsc();
    osc4 = new p5.SinOsc();
    osc5 = new p5.SinOsc();
    delay = new p5.Delay();
    delay2 = new p5.Delay();
    delay3 = new p5.Delay();
    delay4 = new p5.Delay();
    reverb = new p5.Reverb();
    env1 = new p5.Env();
    env2 = new p5.Env();
    env3 = new p5.Env();
    env4 = new p5.Env();
    osc1.disconnect();
    osc1.connect(reverb);
    env1.setRange(1, 0);
    env2.setRange(0.2, 0);
    env3.setRange(0.2, 0);
    env4.setRange(1, 0);
    env1.setADSR(0.85, 0.2, 0, 0);
    env2.setADSR(0.85, 0.2, 0, 0);
    env3.setADSR(0.85, 0.2, 0, 0);
    env4.setADSR(0.85, 0.2, 0, 0);
    osc2.disconnect();
    osc2.connect(reverb);
    osc3.disconnect();
    osc3.connect(reverb);
    osc4.disconnect();
    osc4.connect(reverb);
    osc5.disconnect();
    osc5.connect(reverb);
    osc1.amp(env1);
    osc2.amp(env2);
    osc3.amp(env3);
    osc4.amp(env4);
    recorder = new p5.SoundRecorder();
    soundFile = new p5.SoundFile();
    osc1.start();
    osc2.start();
    osc3.start();
    osc4.start();
    osc5.start();
    osc5.amp(0);
    reverb.set(8, 80);
}
var delayOffset = 0;
var iterations = 0;
var auto = setInterval(function () {
    computerMakeMusic();
}, 1000 / 30);
var volume = 0;
var anglePoints = [];
var delayFlutter = 0;

function createAnglePoints() {
    for (base = 0; base <= 2; base += 0.125) {
        angle = Math.PI * base;
        anglePoints.push(angle);
    }
}
createAnglePoints();

function computerMakeMusic() {
    recorder.record(soundFile);
    strokeWeight(0.8);
    targetNumber = Math.floor(random(0, 40));
    targetNumber2 = Math.floor(random(0, 40));
    targetNumber3 = Math.floor(random(0, 40));
    delayFlutter += 0.01;
    delay.setType(1);
    delay.process(osc3, 0.8, 0.7, random(500, 5000));
    delay2.process(osc2,  0.9, 0.7, random(500, 5000));
    delay3.process(reverb, 0.95, 0.7, random(500, 5000));
    if (iterations % 50 === 0) {
        let note = midiToFreq(notes[Math.floor(random(notes.length))]) + random(-3, 3);
        let note2 = note + random(-3, 3);
        osc3.freq(note);
        env3.play();
        osc2.freq(note2);
        env2.play();
    }
    if (iterations % 75 === 0) {
        let selectedNote = notes[Math.floor(random(notes.length))];
        if (selectedNote === 60 || selectedNote === 72) {
            osc2.freq(midiToFreq(selectedNote) + random(-2, 2));
            env2.play();
            osc3.freq(midiToFreq(selectedNote + 9) + random(-2, 2));
            env3.play();
        } else if(selectedNote === 64 || selectedNote === 76){
            osc2.freq(midiToFreq(selectedNote) + random(-2, 2));
            env2.play();
            osc3.freq(midiToFreq(selectedNote + 5) + random(-2, 2));
            env3.play();
        } else {
            osc2.freq(midiToFreq(selectedNote) + random(-2, 2));
            env2.play();
            osc3.freq(midiToFreq(selectedNote + 7) + random(-2, 2));
            env3.play();
        }
    }
    if (iterations % 100 === 0) {
        osc1.freq(midiToFreq(notes[Math.floor(random(notes.length))] - 12) + random(-2, 2));
        env1.play();
        osc1.freq(midiToFreq(notes[Math.floor(random(notes.length))]) + random(-2, 2));
        env1.play();
    }
    if (iterations % 200 === 0) {
        osc4.freq(midiToFreq(bassNotes[Math.floor(random(bassNotes.length))]) + random(-1, 1));
        env4.play(osc4);
    }
    iterations++;
}
