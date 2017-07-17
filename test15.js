var notes = [
    60,
    62,
    64,
    67,
    69,
    71,
    72,
    74,
    76,
    79,
    81,
    83,
    84
];
Synths = [];
sineSynths = [];

function Synth() {}

function makeOSC() {
    for (var index = 1; index <= 3; index++) {
        var synth = new p5.SinOsc();
        var reverb = new p5.Reverb();
        var env = new p5.Env();
        var delay = new p5.Delay();
        env.setRange(0.5, 0);
        env.setADSR(0.02, 0.05, 0, 0.01);
        synth.disconnect();
        synth.connect(reverb);
        reverb.set(8, 80);
        synth.amp(env);
        synth.start();
        Synths.push({synth, env, delay});
    }
    console.log(Synths);
}

function makesineOSC() {
    for (var index = 1; index <= 3; index++) {
        var synth = new p5.SinOsc();
        var reverb = new p5.Reverb();
        var env = new p5.Env();
        var delay = new p5.Delay();
        env.setRange(1, 0);
        env.setADSR(0.02, 0.05, 0, 0.01);
        synth.disconnect();
        synth.connect(reverb);
        reverb.set(5, 20);
        synth.amp(env);
        synth.start();
        sineSynths.push({synth, env, delay});
    }
    console.log(Synths);
}

makeOSC();
makesineOSC();
var w = window.innerWidth - 6.5;
var h = window.innerHeight - 6.5;
//initializing oscillators, delays, reverb, filter, and envelopes
function setup() {
    createCanvas(w, h);
    background(0);
    osc1 = new p5.SinOsc();
    osc2 = new p5.SqrOsc();
    osc3 = new p5.SawOsc();
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
    env1.setADSR(0.25, 0.3, 0, 0.3);
    env2.setADSR(0.5, 0.3, 0, 0.3);
    env3.setADSR(0.5, 0.4, 0, 0.3);
    env4.setADSR(1, 0.9, 0, 0.3);
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
            for (var i = 0; i < Synths.length; i++) {
                Synths[i].delay.process(Synths[i].synth, 0.54, 0.7);
            }
    if (iterations % 15 === 0) {
        for (var i = 0; i < Synths.length; i++) {
            Synths[i]
                .synth
                .freq(midiToFreq(notes[Math.floor(random(notes.length))]) + random(-3, 3));
            Synths[i]
                .env
                .play();
            xPos = random(0, w);
            yPos = random(0, h);
            noFill();
            stroke(random(0,200), random(0,200), random(0,200));
            ellipse(xPos, yPos, 50, 50);
        }
    }
    //if (iterations % 28 === 0) {
    //    for (var i = 0; i < Synths.length; i++) {
    //        sineSynths[i]
    //            .synth
    //            .freq(midiToFreq(notes[Math.floor(random(notes.length))]) + random(-3, 3));
    //      //  sineSynths[i]
    //      //      .env
    //      //      .play();
    //        xPos = random(0, w);
    //        yPos = random(0, h);
    //        ellipse(xPos, yPos, 50, 50);
    //        noFill();
    //        stroke(random(0,200), random(0,200), random(0,200));
    //    }
    //}
    iterations++;
}
function keyPressed(){
    if(keyCode===BACKSPACE){
        recorder.stop();
        save(soundFile, 'test2.wav');
    }
}