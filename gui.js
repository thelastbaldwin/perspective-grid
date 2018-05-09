const gui = new dat.GUI();

const controls = new function(){
    this.FOV = 60;
    this.horizon = .5;
    this.cvpAngle = 45;
    this.lvpAngle = 45;
    this.rvpAngle = 45;
    this.lineCount = 60;
    this.lineThickness = .01;
    this.vanishingPoints = 2;
}

gui.add(controls, "cvpAngle", -90, 90).step(1);
gui.add(controls, "vanishingPoints", 2, 3, 1);
gui.add(controls, "FOV", 50, 90);
gui.add(controls, "rvpAngle", 0, 90).step(1);
const lvpAngle = gui.add(controls, "lvpAngle", 0, 90).listen();
gui.add(controls, "horizon", 0, 1);
gui.add(controls, "lineCount", 36, 160);
gui.add(controls, "lineThickness", .01, .05);
gui.width = 400;