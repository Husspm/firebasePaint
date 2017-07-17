function setup() {
    w = window.innerWidth;
    h = window.innerHeight;
    createCanvas(w, h);
    background(0);
}
// synth arrays and corresponding controls.
var sine = [],
    sineEnv = [],
    sineDly = [],
    sineRev = [];

var tri = [],
    triEnv = [],
    triDly = [];

function makeSinOsc() {
    for (amount = 1; amount <= 4; amount++) {
        let synth = new p5.SinOsc();
        let env = new p5.Env();
        let dl = new p5.Delay();
        let rv = new p5.Reverb();
        rv.set(8, 90);
        synth.disconnect();
        synth.connect(rv);
        env.setInput(synth);
        sine.push(synth);
        sineEnv.push(env);
        sineDly.push(dl);
        sineRev.push(rv);
        synth.start();
    }
}
makeSinOsc();

var auto = setInterval(function () {
    computerMakeMusic();
}, 1000 / 5);
var iterations = 1;

function computerMakeMusic() {
    let targetNumber = Math.floor(random(0, 10));
    if (targetNumber === 5) {
        let playStateOption = Math.floor(random(0, 2));
        console.log('hit', playStateOption);
        playStateOne(playStateOption);
    }
}

function playStateOne(output) {
    if (output === 0) {
        for (var i = 0, dlyT = 0.5, range = 0; i < sine.length; i++, dlyT += 0.1, range += 2) {
            range += i;
            sine[i].freq(midiToFreq(60 + range));
            sineDly[i].process(sineRev[i], dlyT, 0.6);
            sineEnv[i].setADSR(1.2, 0.1, 0, 0.1);
            sineEnv[i].play();
        }
    } else if (output === 1) {
        for (var i = 0, dlyT = 0.5, range = 0; i < sine.length; i++, dlyT += 0.1, range += 2) {
            range += i;
            sine[i].freq(midiToFreq(48 + range));
            sineDly[i].process(sineRev[i], dlyT, 0.6);
            sineEnv[i].setADSR(1.2, 0.1, 0, 0.1);
            sineEnv[i].play();
        }

    }
}