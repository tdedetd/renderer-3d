import { Renderer } from "./renderer";
import { Scene, Camera } from "./scene";
import { Line3d, Point3d } from "./geometry";
import { Rotation } from "./scene/rotation";

const scene = new Scene();

scene.addOutlines(
  new Line3d(new Point3d(5, -4, 0), new Point3d(50, -4, 0)),
  new Line3d(new Point3d(5, 4, 0), new Point3d(50, 4, 0)),
);

const camera = new Camera();
camera.position = new Point3d(10, 0, 5);
camera.rotation = new Rotation(0, 15, 0);
scene.setCamera(camera);

const renderer = new Renderer(scene, 'canvas', 640, 480);
renderer.draw();
