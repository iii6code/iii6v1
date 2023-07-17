import "../public/app.scss";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// const devs = document.getElementById("dev-inf");
const move = document.getElementById("move");
const stage = document.getElementById("stage");
const nav = document.getElementById("nav");
const bg = document.getElementById("bg");
const title1 = document.getElementById("txtbox1");
const title2 = document.getElementById("txtbox2");
const title3 = document.getElementById("txtbox3");
const title4 = document.getElementById("txtbox4");
const title5 = document.getElementById("txtbox5");
const clock = document.getElementById("mintclock");
let countDownDate = new Date("Aug 17, 2023 20:00:00").getTime();
const setCD = () => {
  let now = new Date().getTime();
  let distance = countDownDate - now;
  // console.log("watch", countDownDate);
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Display the result in the element with id="demo"
  clock.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
};
setInterval(setCD, 1000);
/*
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
bg.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const light = new THREE.DirectionalLight("#dada01", 0.8);
light.position.set(0, 15, 10);
light.target.position.set(0, 0, -5);
scene.add(light);
scene.add(light.target);
let helper = new THREE.DirectionalLightHelper(light, 7);
light.add(helper);
let iii6model;
const loader = new GLTFLoader();
loader.load("../images/iii6.glb", (gltfScene) => {
  console.log(gltfScene);
  iii6model = gltfScene.scene;
  const material = new THREE.MeshStandardMaterial({ color: "#456323", wireframe: true });
  iii6model.scale.set(0.05, 0.05, 0.05);
  iii6model.position.x = 0;
  iii6model.position.y = 0;
  iii6model.position.z = -5;
  iii6model.add(material);
  scene.add(iii6model);
});

// const axesHelper = new THREE.AxesHelper(5);
const boxGeo = new THREE.BoxGeometry(0.5, 0.4, 0.3);
const boxMat = new THREE.MeshBasicMaterial({ color: "#543216" });
const box = new THREE.Mesh(boxGeo, boxMat);
// scene.add(axesHelper);
// scene.add(box);

const animateBox = () => {
  if (iii6model) {
    iii6model.rotation.x += 0.0002;
    iii6model.rotation.y += 0.002;
    iii6model.rotation.z += 0.002;
  }
  renderer.render(scene, camera);
};
const paralax3d = () => {
  camera.position.set((stage.style.width + window.event.clientX) / 180 + stage.style.width / 2, (stage.style.height - window.event.clientY) / 180 - stage.style.height / 2, 10);
};
// const controls = new OrbitControls(camera, renderer.domElement);

renderer.setAnimationLoop(animateBox);
// renderer.render(scene, camera);
// */

const show = (e) => {
  let em = nav.offsetHeight / 2.5;
  let dif = (100 / (move.offsetHeight - em)) * stage.scrollTop;
  // devs.innerHTML = "Stage :" + (stage.scrollTop / em).toFixed(2) + "em / " + stage.scrollTop + "px / " + dif.toFixed(2) + "% / " + (Number(move.offsetHeight) - em);
  title1.style.left = -200 + (10 - dif * 1) + "%";
  title2.style.left = -200 + (10 - dif * 1) + "%";
  title3.style.left = -200 + (10 - dif * 1) + "%";
  title4.style.left = -200 + (10 - dif * 1) + "%";
  title5.style.left = -200 + (10 - dif * 1) + "%";
};
stage.addEventListener("scroll", show);

// document.body.addEventListener("mousemove", paralax3d);
