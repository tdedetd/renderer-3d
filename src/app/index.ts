import { Color, Renderer } from './renderer';
import { Scene, Camera, Rotation, Cube } from './scene';
import { Point3d } from './geometry';
import { uiUtils } from './utils';

const ROTATION = new Rotation(0, 0, 0);

const scene = new Scene();
scene.addObjects(
  new Cube(
    { color: new Color(64, 64, 255) },
    new Point3d(0, 0, 0),
    ROTATION,
    5
  ),
  new Cube(
    { color: new Color(255, 0, 0) },
    new Point3d(-2, 4, -1),
    ROTATION,
    3
  ),
  new Cube(
    { color: new Color(255, 255, 128) },
    new Point3d(0, 0, -65),
    ROTATION,
    100
  )
);

const camera = new Camera();
camera.position = new Point3d(-7, -3, 8);
camera.rotation = new Rotation(0, 42, 35);
camera.distance = 18;

uiUtils.init(new Renderer(scene, 'canvas', camera));
