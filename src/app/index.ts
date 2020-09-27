import { Color, Renderer } from './renderer';
import { Scene, Camera, Rotation, Cube } from './scene';
import { Line3d, Point3d } from './geometry';
import { uiUtils } from './utils';
import { Resolution } from './resolution';

const scene = new Scene();
scene.addObjects(
  new Cube(
    new Color(64, 64, 255),
    new Point3d(0, 0, 0),
    new Rotation(0, 0, 0),
    5
  )
);

const camera = new Camera();
camera.position = new Point3d(8, 8, 8);
camera.rotation = new Rotation(0, -45, 225);

const line = new Line3d(
  new Point3d(2, 3, 10),
  new Point3d(4, 4, -10)
);

uiUtils.init(new Renderer(scene, 'canvas', camera, new Resolution(320, 240)));
