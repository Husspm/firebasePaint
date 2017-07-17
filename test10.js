var notes = [
    48,
    50,
    52,
    55,
    57,
    59,
    60,
    62,
    64,
    67,
    69,
    71,
    72,
    74,
    76,
    79
];
var i = 0;
var width = 600;
var height = 600;

function setup() {
    osc1 = new p5.SinOsc();
    osc4 = new p5.SinOsc();
    dist = new p5.Distortion(0.005, '4x');
    filter = new p5.HighPass();
    console.log(dist.amount);
    osc1.disconnect();
    osc4.disconnect();
    osc1.connect(filter);
    osc4.connect(filter);
    osc2 = new p5.TriOsc();
    //osc2.start();
    fft = new p5.FFT(0.8, 16);
    frameRate(100 / 60);
    delay = new p5.Delay();
    delay2 = new p5.Delay();
    delay3 = new p5.Delay();
    reverb = new p5.Reverb();
    reverb2 = new p5.Reverb();
    osc3 = new p5.SinOsc();
    osc3.disconnect();
    osc3.connect(reverb);
    reverb.connect(delay);
    delay.connect(reverb);
    env = new p5.Env();
    env.setADSR(0.01, 0.1, 0.1, 0.11);
    env.setRange(1, 0);
    env.setInput(osc1, osc3, osc4);
    w = windowWidth;
}
var xOff = 0;
var xPosition = 50;
var offSet = 0;

function draw() {
    xOff += 0.02;
    osc1.start();
    //osc2.start();
    osc3.start();
    osc4.start();
    env.setADSR(noise(xOff) * 0.9, random(0.08, 3.2), 0.1, 3.2);
    randomNote = notes[Math.floor(random(notes.length)) - 12];
    var freq = midiToFreq(randomNote);
    var freq2 = midiToFreq(notes[Math.floor(random(notes.length))] + offSet - 12);
    //var freq3 = midiToFreq(notes[i] + 7);
    var freq4 = midiToFreq(notes[Math.floor(random(notes.length))] - 12);
    osc1.freq(freq);
    osc4.freq(freq4);
    filter.freq(noise(xOff) * 7000);
    filter.res(random(20, 60));
    //osc2.freq(freq3 + random(1, 9));
    osc3.freq(freq2);
    delay.setType(1);
    delay2.setType(1);
    delay.process(osc1, noise(xOff) * 0.65, 0.75, 5000);
    delay2.process(osc4, noise(xOff) * 0.65, 0.75, 1200);
    reverb.process(delay, random(3, 9), random(70, 80));
    reverb2.process(osc3, random(3, 9), random(30, 80));
    delay3.process(reverb2, 0.65, 0.75, 300);
    env.play();
    i++;
    if (i >= notes.length) {
        i = 0;
    }
}