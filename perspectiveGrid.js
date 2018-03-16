const fragmentShader = document.getElementById("fragment-shader").textContent;
const vertexShader = document.getElementById("vertex-shader").textContent;
const scene = new THREE.Scene();
const renderer = window.WebGLRenderingContext ?
    new THREE.WebGLRenderer({preserveDrawingBuffer: true}):
    new THREE.CanvasRenderer({preserveDrawingBuffer: true});
const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );

var quadGeometry = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight, 1, 1 );
const quadMaterial = new THREE.ShaderMaterial({
    uniforms: {
        u_resolution:{
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        u_FOV:{
            value: controls.FOV
        },
        u_hl: {value: controls.horizon},
        u_lineCount: {value: controls.lineCount},
        u_lvp: {value: controls.leftVanishingPoint},
        u_rvp: {value: controls.rightVanishingPoint},
        u_lineThickness: {value: controls.lineThickness}
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});
const quad = new THREE.Mesh(quadGeometry, quadMaterial);

camera.position.x = 0;
camera.position.y =	0;
camera.position.z = 100;
camera.lookAt(scene.position);
scene.add(camera);
scene.add(quad);

function degToRad(deg){
    return deg * Math.PI / 180;
}


// TODO: use this relative to the longest edge
// returns the depth of the station point as a ratio of the FOV to longest edge
// assumes that the FOV is length of the longest edge
function getSPLength(FOVrad){
    return .5 / Math.tan(FOVrad/2);
}

function getVPDistanceFromCenter(sp, angle){
    return sp * Math.tan(angle);
}

function updateAspectRatioDisplay(){
    document.querySelector("#info span").innerText = (window.innerWidth / window.innerHeight).toFixed(2);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    updateAspectRatioDisplay();
}

function initScene(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
    updateAspectRatioDisplay();
    render();
}

function setLVPAngle(rvpAngle){
    lvpAngle.setValue(90 - rvpAngle);
}

function updateUniforms(config){
    quadMaterial.uniforms.u_resolution.value = config.u_resolution;
    quadMaterial.uniforms.u_hl.value = config.u_hl;
    quadMaterial.uniforms.u_lineCount.value = config.u_lineCount;
    quadMaterial.uniforms.u_lvp.value = config.u_lvp;
    quadMaterial.uniforms.u_rvp.value = config.u_rvp;
    quadMaterial.uniforms.u_lineThickness.value = config.u_lineThickness;
}

function render(){
    const FOV = degToRad(controls.FOV);
    const rvpAngle = degToRad(controls.rvpAngle);
    const lvpAngle = degToRad(90 - controls.rvpAngle);
    const spLength = getSPLength(FOV);

    //.5 is the normalized center of the frame, since 0 and 1 are the edges
    const RVP = .5 + getVPDistanceFromCenter(spLength, rvpAngle);
    const LVP = .5 - getVPDistanceFromCenter(spLength, lvpAngle);

    updateUniforms({
        u_resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
        u_hl: controls.horizon,
        u_lineCount: controls.lineCount,
        u_lvp: LVP,
        u_rvp: RVP,
        u_lineThickness: controls.lineThickness
    });
    setLVPAngle(controls.rvpAngle);
    // console.log(controls.lvpAngle);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", function(){
    initScene();
});

document.addEventListener("resize", onWindowResize);

document.getElementById("download").addEventListener("click", function(){
    const img = document.querySelector("#WebGL-output canvas").toDataURL('image/jpg');
    this.href = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}, false);