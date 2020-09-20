import { Renderer } from './renderer';
import { Scene, Camera } from './scene';
import { Line3d, Point3d } from './geometry';
import { Rotation } from './scene/rotation';
import { uiUtils } from './utils';

const scene = new Scene();

scene.addOutlines(
  new Line3d(new Point3d(5, -4, 0), new Point3d(500, -4, 0)),
  new Line3d(new Point3d(5, 4, 0), new Point3d(500, 4, 0)),
  new Line3d(new Point3d(12, 2, 0), new Point3d(16, 2, 0)),
  new Line3d(new Point3d(12, 0, 0), new Point3d(16, 0, 0)),
  new Line3d(new Point3d(12, -2, 0), new Point3d(16, -2, 0)),
  new Line3d(new Point3d(7, 6, 0), new Point3d(7, 6, 5)),
  new Line3d(new Point3d(13, -6, 0), new Point3d(13, -6, 5)),
);

const camera = new Camera();

camera.position = new Point3d(0, 5, 5);
camera.rotation = new Rotation(0, 15, -30);

scene.setCamera(camera);
uiUtils.init(new Renderer(scene, 'canvas', 1024, 768));
