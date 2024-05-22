import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

// Import the position module
import { getPosition } from './position.js';

let camera, scene, renderer, clock;
let staticModel, animationModels = [];
let controls;
let animationMixers = [];
let lastPosition = null;

function init() {
    scene = new THREE.Scene();
    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 2, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight1.position.set(0, 1, 0).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, 1).normalize();
    scene.add(directionalLight2);

    createGradientBackground();
    createGround();
    loadStaticModel();
    loadAnimationModels();
    animate();
}

function createGradientBackground() {
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        varying vec2 vUv;
        void main() {
            vec3 topColor = vec3(0.5, 0.7, 1.0);
            vec3 bottomColor = vec3(1.0, 1.0, 1.0);
            vec3 color = mix(bottomColor, topColor, vUv.y);
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    const geometry = new THREE.SphereGeometry(100, 32, 32);
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

function createGround() {
    const textureLoader = new THREE.TextureLoader();
    const groundTexture = textureLoader.load('https://threejs.org/examples/textures/grid.png');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10, 10);

    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture, roughness: 1 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);
}

function loadStaticModel() {
    const loader = new GLTFLoader();
    loader.load('models/StaticModel.gltf', (gltf) => {
        staticModel = gltf.scene;
        staticModel.visible = true; // Start with the static model visible
        scene.add(staticModel);
    }, undefined, loadModelFailed);
}

function loadAnimationModels() {
    const animationFiles = ['models/Animation1.gltf', 'models/Animation2.gltf', 'models/Animation3.gltf', 'models/Animation4.gltf'];
    const loader = new GLTFLoader();

    animationFiles.forEach((file, index) => {
        loader.load(file, (gltf) => {
            const animationModel = gltf.scene;
            animationModel.visible = false;
            animationModels.push(animationModel);

            const animationMixer = new THREE.AnimationMixer(animationModel);
            gltf.animations.forEach((anim) => {
                const action = animationMixer.clipAction(anim);
                action.play();
            });
            animationMixers.push(animationMixer);

            scene.add(animationModel);
        }, undefined, loadModelFailed);
    });
}

function showModel(model) {
    if (staticModel) staticModel.visible = (model === staticModel);
    animationModels.forEach(animModel => {
        animModel.visible = (animModel === model);
    });
}

function updateModelsBasedOnPosition() {
    const position = getPosition();
    if (position !== lastPosition) {
        lastPosition = position;
        console.log("Current Position: ", position);
        const positionDisplay = document.getElementById('positionDisplay');
        
        // Update the text content of the positionDisplay div in the desired format
        positionDisplay.innerText = `현재 좌표: ${position}`;
        
        switch (position) {
            case "원위치":
                showModel(staticModel);
                break;
            case "1번 좌표":
                showModel(animationModels[0]);
                break;
            case "2번 좌표":
                showModel(animationModels[1]);
                break;
            case "3번 좌표":
                showModel(animationModels[2]);
                break;
            case "4번 좌표":
                showModel(animationModels[3]);
                break;
            default:
                showModel(staticModel);
                break;
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    animationMixers.forEach(mixer => mixer.update(delta));
    controls.update();
    renderer.render(scene, camera);

    updateModelsBasedOnPosition();
}

function loadModelFailed(error) {
    console.error("Failed to load model: ", error);
    alert('Failed to load the model, please check the console for more information.');
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.update();
});

init();
