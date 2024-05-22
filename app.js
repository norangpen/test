// app.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer;
let model;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

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
    renderer.render(scene, camera);
}

function updateModel() {
    const position = getPosition();
    let modelPath;

    switch (position) {
        case "원위치":
            modelPath = 'models/StaticModel.gltf';
            break;
        case "1번 좌표":
            modelPath = 'models/Animation1.gltf';
            break;
        case "2번 좌표":
            modelPath = 'models/Animation2.gltf';
            break;
        case "3번 좌표":
            modelPath = 'models/Animation3.gltf';
            break;
        case "4번 좌표":
            modelPath = 'models/Animation4.gltf';
            break;
        default:
            modelPath = 'models/StaticModel.gltf';
            break;
    }

    loadModel(modelPath);
    document.getElementById('positionDisplay').innerText = `현재 좌표: ${position}`;
}

window.setInterval(updateModel, 1000);  // Check for position updates every 3 seconds

init();
