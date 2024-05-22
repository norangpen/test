// app.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let model;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    camera.position.set(0, 1, 5);
    controls.update();

    loadModel('StaticModel.gltf');  // Load initial model

    animate();
}

function loadModel(modelPath) {
    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        function (gltf) {
            if (model) {
                scene.remove(model);
            }
            model = gltf.scene;
            scene.add(model);
        },
        undefined,
        function (error) {
            console.error('An error occurred while loading the model', error);
        }
    );
}

function animate() {
    requestAnimationFrame(animate);
    if (model) {
        model.rotation.y += 0.01;  // Example animation
    }
    controls.update();
    renderer.render(scene, camera);
}

function updateModel() {
    const position = getPosition();
    let modelPath;

    switch (position) {
        case "원위치":
            modelPath = 'StaticModel.gltf';
            break;
        case "1번 좌표":
            modelPath = 'Animation1.gltf';
            break;
        case "2번 좌표":
            modelPath = 'Animation2.gltf';
            break;
        case "3번 좌표":
            modelPath = 'Animation3.gltf';
            break;
        case "4번 좌표":
            modelPath = 'Animation4.gltf';
            break;
        default:
            modelPath = 'StaticModel.gltf';
            break;
    }

    loadModel(modelPath);
    document.getElementById('positionDisplay').innerText = `현재 좌표: ${position}`;
}

window.setInterval(updateModel, 3000);  // Check for position updates every 3 seconds

init();
