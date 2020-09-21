import { Renderer } from './renderer';
import { Scene, Camera } from './scene';
import { Point3d } from './geometry';
import { Rotation } from './scene/rotation';
import { uiUtils } from './utils';
import { Resolution } from './resolution';

const scene = new Scene();
const camera = new Camera();

camera.position = new Point3d(0, 5, 5);
camera.rotation = new Rotation(0, 15, -30);

uiUtils.init(new Renderer(scene, 'canvas', camera, new Resolution(1024, 768)));
