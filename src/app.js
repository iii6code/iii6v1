import "../public/app.scss";
import ethers from "ethers";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import Draggable from "gsap/Draggable";
gsap.registerPlugin(ScrollTrigger, Draggable, Flip);
/*
 */
import { setDimensions, IAO, newWidth, newHeight } from "./dias";
setDimensions();

/*
const sdk = require("api")("@fortress/v1.0#keedbllp9wkys");

sdk
  .getApiOrganizationV1CurrentOrganization()
  .then(({ data }) => console.log(data))
  .catch((err) => console.error(err));
*/
const devs = document.getElementById("dev-inf");
const move = document.getElementById("move");
const stage = document.getElementById("stage");
const nav = document.getElementById("nav");
const bg = document.getElementById("bg");
const close = document.getElementById("close");
const mod_frame = document.getElementById("account_mod");
const mod_head = document.getElementById("mod_head");
const mod_body = document.getElementById("actioncall");
const mod_txt = document.getElementById("actiontxt");
const mod_foot = document.getElementById("mod_foot");
const account = document.getElementById("connect");
let act = document.getElementById("act");
let edit = document.getElementById("edit");
let cancel = document.getElementById("cancel");
let imprint = document.getElementById("imprint");
let contact = document.getElementById("contact");
let terms = document.getElementById("terms");
const title1 = document.getElementById("title1");
const title2 = document.getElementById("title2");
const title3 = document.getElementById("title3");
const title4 = document.getElementById("title4");
const title5 = document.getElementById("title5");
const ploc = document.getElementById("project_location");
const diascanvas = document.getElementById("diascanvas");
const pds = document.getElementById("projectdimensions");
const nullaya = document.getElementById("null");

const loadToken = async (id) => {
  // console.log("Layers : " + IAO.layers.length);
  pds.innerHTML = "";
  IAO.layers.map((layer) => {
    // console.log("Layer ID : " + layer.id + " / " + Number(id));
    // console.log("Layer Type : " + layer.content.type);
    // console.log("Layer Data Path : " + layer.content.path);
    // console.log("Layer Digits : " + layer.content.digits);
    let path = layer.content.name == "aniname" ? layer.content.path + "/" + Math.floor(id[layer.content.digits[0]] / 2) + "/" + id[layer.content.digits[1]] : layer.content.name == "cover" ? layer.content.path + "/" + Math.floor(id[layer.content.digits[0]] / 2) + "/" + id[layer.content.digits[1]] : layer.content.name == "animal" ? layer.content.path + "/" + Math.floor(id[layer.content.digits[0]] / 2) : layer.content.name == "logo" ? layer.content.path + "/logo" : layer.content.name == "map" ? layer.content.path + "/belize/" + id[layer.content.digits[0]] : layer.content.path + "/" + id[layer.content.digits[0]];
    console.log(path, layer.content.digits);

    pds.innerHTML += `<div id="l${layer.id}" class="layertemp">
    ${layer.content.type == "text" ? '<div id="txttemp" width=' + newWidth + " height=" + newHeight + '">"' + layer.content.path + '"</div>' : ""}
    ${layer.content.type == "image" ? '<img id="imgtemp" src="' + path + '.png" width=' + newWidth + " height=" + newHeight + ';"/>' : ""}
    ${layer.content.type == "video" ? '<video id="vidtemp" controls width=' + newWidth + " height=" + newHeight + '"><source src="' + path + '.mp4" /></video>' : ""}
    ${layer.content.type == "audio" ? '<audio id="audtemp" controls  width=' + newWidth + " height=" + newHeight + '" src="' + path + '.mp3" />' : ""}
    ${layer.content.type == "image" ? '<img id="svgtemp" src="' + layer.content.path + "/" + layer.content.digits[0] + '.svg" width=' + newWidth + " height=" + newHeight + ';"/>' : ""}
    </div>`;
    document.getElementById("imgtemp").style.display = "block";
  });
};
const makeRandom = () => {
  let p = Math.floor(Math.random() * 100);
  let t = Math.floor(Math.random() * 10);
  let n = Date.now();
  console.log("ID :: " + String(p) + String(t) + String(n));
  loadToken(String(p) + String(t) + String(n));
};
makeRandom();
setInterval(makeRandom, 12345);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
bg.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-3.5, 2.2, 1.5);
const light = new THREE.DirectionalLight("#ddddff", 10);
light.position.set(-20, 0, 0);
light.target.position.set(5, -12, -5);
scene.add(light);
scene.add(light.target);
let helper = new THREE.DirectionalLightHelper(light, 7);
light.add(helper);
let iii6model;
const loader = new GLTFLoader();
loader.load("../images/globe_alone.glb", (gltfScene) => {
  console.log(gltfScene);
  iii6model = gltfScene.scene;
  const material = new THREE.MeshStandardMaterial({ color: "#456323", wireframe: true });
  iii6model.scale.set(1, 1, 1);
  iii6model.position.x = 0;
  iii6model.position.y = 0;
  iii6model.position.z = -5;
  iii6model.rotation.x += 0.235;
  scene.add(iii6model);
});

// const axesHelper = new THREE.AxesHelper(5);
const boxGeo = new THREE.BoxGeometry(50, 50, 0.2);
const boxMat = new THREE.MeshBasicMaterial({ color: "#ededeff" });
const box = new THREE.Mesh(boxGeo, boxMat);
box.position.set(0, 0, -20);
// scene.add(axesHelper);
scene.add(box);

const animateBox = () => {
  if (iii6model) {
    iii6model.rotation.x += 0.0;
    iii6model.rotation.y += 0.002;
    iii6model.rotation.z += 0.0;
  }
  renderer.render(scene, camera);
};
const paralax3d = () => {
  camera.position.set((stage.style.width + window.event.clientX) / 180 + stage.style.width / 2, (stage.style.height - window.event.clientY) / 180 - stage.style.height / 2, 10);
};
// const controls = new OrbitControls(camera, renderer.domElement);

renderer.setAnimationLoop(animateBox);
// renderer.render(scene, camera);
bg.style.opacity = 0.3;
let mod_toggle = false;
const setModal = (e) => {
  console.log(mod_toggle, e.target.id);
  if (e.target.id == "close" || e.target.id == "cancel" || e.target.id == "edit" || e.target.id == "act") {
    mod_toggle = false;
  } else if (e.target.id == "terms" || e.target.id == "contact" || e.target.id == "imprint" || e.target.id == "connect") {
    mod_toggle = true;
  } else mod_toggle = !mod_toggle;
  /*
 
  */
  if (mod_toggle == true) {
    mod_frame.style.display = "block";
    if (e.target.id == "connect") {
      let context = {
        head: "Set up Your Account",
        body: "By Submitting the form you accept our <a href='#terms'>terms and conditions</a>.",
        txt: "<div id='actiontxt' class='mod_stage'><label>Name / Surname</label><input placeholder='Jean Dough' id='rnameUP' type='text' class='input' /><label>Nikname</label><input placeholder='LowCarb23' id='nameUP' type='text' class='input' /><label>Email</label><input placeholder='im@here.wtf' id='emailUP' type='email' class='input' /><label>Ethereum Wallet Address</label><div id='loc_num'>  <div id='mmloc' class='slink'>CONNECT</div><input placeholder='0xABC...DEF' id='walletUP' type='text' class='input' /></div><label>Phone Number</label><div id='loc_num'>  <select id='loc'>    <option id='default'> --- </option>  </select>  <input placeholder='123 456 78 90' id='phoneUP' type='number' class='short' /></div></div>",
        foot: "<div id='act' class='link modlink'>ACCEPT</div><div id='edit' class='link modlink'>LOGIN</div><div id='cancel' class='link modlink'>CANCEL</div>",
      };
      mod_head.innerHTML = context.head;
      mod_body.innerHTML = context.body;
      mod_txt.innerHTML = context.txt;
      mod_foot.innerHTML = context.foot;
      act = document.getElementById("act");
      edit = document.getElementById("edit");
      cancel = document.getElementById("cancel");
      cancel.addEventListener("click", setModal);
      act.addEventListener("click", doSignUP);
      edit.addEventListener("click", goLogin);
    } else if (e.target.id == "terms") {
      let context = {
        head: "Terms & Conditions",
        body: "Carbon Market Exchange - Terms & Conditions",
        txt: "...",
        foot: "",
      };
      mod_head.innerHTML = context.head;
      mod_body.innerHTML = context.body;
      mod_txt.innerHTML = context.txt;
      mod_foot.innerHTML = context.foot;
      act = document.getElementById("act");
      edit = document.getElementById("edit");
      cancel = document.getElementById("cancel");
    } else if (e.target.id == "contact") {
      let context = {
        head: "Contact",
        body: "Get in touch with Carbon Market Exchange",
        txt: "...",
        foot: "<div id='act' class='link modlink'>SEND</div><div id='edit' class='link modlink'>EMPTY</div><div id='cancel' class='link modlink'>CANCEL</div>",
      };
      mod_head.innerHTML = context.head;
      mod_body.innerHTML = context.body;
      mod_txt.innerHTML = context.txt;
      mod_foot.innerHTML = context.foot;
      act = document.getElementById("act");
      edit = document.getElementById("edit");
      cancel = document.getElementById("cancel");
      cancel.addEventListener("click", setModal);
      act.addEventListener("click", sendContactMsg);
      edit.addEventListener("click", emptyForm);
    } else if (e.target.id == "imprint") {
      let context = {
        head: "Imprint",
        body: "Carbon Market Exchange",
        txt: "...",
        foot: "",
      };
      mod_head.innerHTML = context.head;
      mod_body.innerHTML = context.body;
      mod_txt.innerHTML = context.txt;
      mod_foot.innerHTML = context.foot;
      act = document.getElementById("act");
      edit = document.getElementById("edit");
      cancel = document.getElementById("cancel");
    }
  } else mod_frame.style.display = "none";
};
const doSignUP = (e) => {
  setModal(e);
};
const goLogin = (e) => {
  let context = {
    head: "Login",
    body: "Choose Web2 or Web3 login ",
    txt: "<label>Username</label><input type='text' id='logname' placeholder='@username' class='input' /><label>Password</label><input type='password' id='logpin' placeholder='A1Bc!d23$' class='input' />",
    foot: "<div id='act' class='link modlink'>WEB2</div><div id='edit' class='link modlink'>WEB3</div><div id='cancel' class='link modlink'>CANCEL</div>",
  };
  mod_head.innerHTML = context.head;
  mod_body.innerHTML = context.body;
  mod_txt.innerHTML = context.txt;
  mod_foot.innerHTML = context.foot;
  act = document.getElementById("act");
  edit = document.getElementById("edit");
  cancel = document.getElementById("cancel");
  cancel.addEventListener("click", setModal);
  act.addEventListener("click", sendContactMsg);
  edit.addEventListener("click", emptyForm);
};
const emptyForm = (e) => {};
const sendContactMsg = (e) => {};

const showAnimals = (e) => {
  const projectArr = {
    projects: [
      {
        id: 0,
        location: "-----",
        name: "Default",
        animals: [],
      },
      {
        id: 1,
        location: "Belize",
        name: "Maya Forest Corridor",
        animals: [
          {
            id: 0,
            name: "Howler Monkey",
            tokensupply: 100000,
            info: "",
          },
          {
            id: 1,
            name: "Jaguar",
            tokensupply: 100000,
            info: "",
          },
          {
            id: 2,
            name: "Tapir",
            tokensupply: 100000,
            info: "",
          },
          {
            id: 3,
            name: "Sarlet Macaw",
            tokensupply: 100000,
            info: "",
          },
          {
            id: 4,
            name: "Spider Monkey",
            tokensupply: 100000,
            info: "",
          },
        ],
      },
    ],
  };

  console.log(e.target.value);

  document.getElementById(String(e.target.value)).style.display = "grid";
};

close.addEventListener("click", setModal);
cancel.addEventListener("click", setModal);
terms.addEventListener("click", setModal);
contact.addEventListener("click", setModal);
imprint.addEventListener("click", setModal);
account.addEventListener("click", setModal);
ploc.addEventListener("change", showAnimals);

gsap.from(".show", { ease: "power", fontSize: "5em", delay: 3, opacity: 0.3 });

// stage.addEventListener("scroll", show);
// document.body.addEventListener("mousemove", paralax3d);
