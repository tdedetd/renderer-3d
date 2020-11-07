import { Color, Renderer } from './renderer';
import { Scene, Camera, Rotation, Cube } from './scene';
import { Point3d } from './geometry';
import { uiUtils } from './utils';
import { Resolution } from './misc/resolution';

const ROTATION = new Rotation(0, 0, 0);

const scene = new Scene();
scene.addObjects(
  new Cube({
    position: new Point3d(0, 0, 1.5),
    rotation: ROTATION,
    material: {
      color: new Color(64, 64, 255)
    },
    width: 5
  }),
  new Cube({
    position: new Point3d(-2, 4, 1.5),
    rotation: ROTATION,
    material: {
      color: new Color(255, 0, 0)
    },
    width: 3
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
camera.position = new Point3d(-7, -5, 5);
camera.rotation = new Rotation(0, 10, 30);
camera.distance = 17;
camera.resolution = new Resolution(160, 120);
camera.fov = 80;

uiUtils.init(new Renderer(scene, 'canvas', camera));
