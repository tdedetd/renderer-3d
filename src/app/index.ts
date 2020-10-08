import { Color, Renderer } from './renderer';
import { Scene, Camera, Rotation, Cube } from './scene';
import { Point3d } from './geometry';
import { uiUtils } from './utils';

const ROTATION = new Rotation(0, 0, 0);

const scene = new Scene();
scene.addObjects(
  new Cube({
    position: new Point3d(0, 0, 0),
    rotation: ROTATION,
    material: {
      color: new Color(64, 64, 255)
    },
    width: 5
  }),
  new Cube({
    position: new Point3d(-2, 4, -1),
    rotation: ROTATION,
    material: {
      color: new Color(255, 0, 0)
    },
    width: 3
  }),
  new Cube({
    position: new Point3d(0, 0, -65),
    rotation: ROTATION,
    material: {
      color: new Color(255, 255, 128)
    },
    width: 100
  }),
);

const camera = new Camera();
camera.position = new Point3d(-7, -3, 8);
camera.rotation = new Rotation(0, 42, 35);
camera.distance = 20;

uiUtils.init(new Renderer(scene, 'canvas', camera));
