import { Renderer } from "./renderer";
import { Scene, Camera } from "./scene";

const scene = new Scene();
scene.setCamera(new Camera());
const renderer = new Renderer(scene, 'canvas', 640, 480);
renderer.draw();
