const gui = new dat.GUI();

const controls = new function(){
    this.FOV = 60;
    this.horizon = .5;
    this.lvpAngle = 45;
    this.rvpAngle = 45;
    this.lineCount = 60;
    this.lineThickness = .01;
}

gui.add(controls, "FOV", 50, 90);
gui.add(controls, "rvpAngle", 0, 90).step(1);
const lvpAngle = gui.add(controls, "lvpAngle", 0, 90).listen();
gui.add(controls, "horizon", 0, 1);
gui.add(controls, "lineCount", 36, 160);
gui.add(controls, "lineThickness", .01, .99);
gui.width = 400;