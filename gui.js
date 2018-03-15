const gui = new dat.GUI();

const controls = new function(){
    this.horizon = .5;
    this.leftVanishingPoint = -.1;
    this.leftDecay = .98;
    this.rightVanishingPoint = 1.1;
    this.rightDecay = .98;
    this.lineCount = 60;
    this.lineThickness = .01;
}

gui.add(controls, "horizon", 0, 1);
gui.add(controls, "lineCount", 36, 160);
gui.add(controls, "leftVanishingPoint", -1, 2);
gui.add(controls, "rightVanishingPoint", -1, 2);
gui.add(controls, "lineThickness", .01, .99);

gui.width = 400;