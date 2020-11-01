import { Color, Renderer } from './renderer';
import { Scene, Camera, Rotation, Cube, Sphere } from './scene';
import { Point3d } from './geometry';
import { uiUtils } from './utils';

const ROTATION = new Rotation(0, 0, 0);

const scene = new Scene();
scene.addObjects(
  new Cube({
    position: new Point3d(0, 0, 1.5),
    rotation: ROTATION,
    material: {
      color: new Color(64, 64, 255)
    },
    width: 3
  }),
  new Sphere({
    position: new Point3d(-2, 4, 1.5),
    rotation: ROTATION,
    material: {
      color: new Color(255, 0, 0)
    },
    radius: 1.5
  }),
  new Cube({
    position: new Point3d(0, 0, -50),
    rotation: ROTATION,
    material: {
      color: new Color(255, 255, 128)
    },
    width: 100
  }),
);

const camera = new Camera();
camera.position = new Point3d(-6, -3, 1);
camera.rotation = new Rotation(0, -3, 40);
camera.distance = 17;
camera.fov = 80;

uiUtils.init(new Renderer(scene, 'canvas', camera));
