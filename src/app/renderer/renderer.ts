import { Scene, Camera } from '../scene';
import { Screen } from './screen';
import { Resolution } from '../resolution';
import { Color } from './color';

export class Renderer {
  private background: string;
  private camera: Camera;
  private resolution: Resolution;
  private scene: Scene;
  private screen: Screen;

  constructor(scene: Scene, canvasId: string, camera: Camera, resolution: Resolution) {
    this.camera = camera;
    this.scene = scene;
    this.screen = new Screen(canvasId, resolution, '#eeeeee');
    this.resolution = resolution;
  }

  public getCamera() {
    return this.camera;
  }

  /**
   * @returns time of rendering in miliseconds
   */
  public render(): number {

    const t0 = performance.now();
    const rays = this.camera.getRays(this.resolution.width, this.resolution.height);

    this.screen.clear();

    for (let y = 0; y < this.resolution.height; y++) {
      for (let x = 0; x < this.resolution.width; x++) {
        this.screen.drawPixel(x, y, new Color(0, 0, 0));
      }
    }

    return performance.now() - t0;
  }
}
