import { Camera } from './camera';
import { Line3d } from '../geometry';

export class Scene {
  private outlines: Line3d[] = [];
  private camera: Camera;

  addOutlines(...lines: Line3d[]) {
    this.outlines.push(...lines);
  }

  getOutlines(): Line3d[] {
    return this.outlines;
  }

  getCamera() {
    return this.camera;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }
}
