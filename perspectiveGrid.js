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

function updateUniforms(){
    quadMaterial.uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    quadMaterial.uniforms.u_hl.value = controls.horizon;
    quadMaterial.uniforms.u_lineCount.value = controls.lineCount;
    quadMaterial.uniforms.u_lvp.value = controls.leftVanishingPoint;
    quadMaterial.uniforms.u_rvp.value = controls.rightVanishingPoint;
    quadMaterial.uniforms.u_lineThickness.value = controls.lineThickness;
}

function render(){
    updateUniforms();
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