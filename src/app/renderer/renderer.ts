import { Line3d } from "../geometry";
import { Resolution } from "../misc/resolution";
import { Camera, Scene } from "../scene";
import { Screen } from './screen';
import { Intercection } from './intercection';

export class Renderer {

  private screen: Screen;

  constructor(private scene: Scene,
              private canvasId: string,
              private camera: Camera) {}

  public getCamera() {
    return this.camera;
  }

  /**
   * @returns time of rendering in miliseconds
   */
  public render(resolution: Resolution): number {

    const t0 = performance.now();
    this.screen = new Screen(this.canvasId, resolution);
    this.camera.resolution = resolution;
    this.camera.updateCanvasConfig();

    for (let y = 0; y < resolution.height; y++) {
      for (let x = 0; x < resolution.width; x++) {
        const ray = this.camera.generateRay(x, y);
        const color = this.getColor(ray);
        this.screen.drawPixel(x, y, color);
      }
    }

    return performance.now() - t0;
  }

  private getColor(ray: Line3d) {
    let closestIntercection: Intercection = null;

    this.scene.getObjects().forEach(obj => {
      const intercections = obj.getIntercections(ray);
      intercections.forEach(intercection => {
        if (!closestIntercection || intercection.distance < closestIntercection.distance) {
          closestIntercection = intercection;
        }
      });
    });

    if (!closestIntercection) return this.scene.backgroundColor;

    const color = closestIntercection.material.color;
    return color.mix(this.scene.backgroundColor, closestIntercection.distance / this.camera.distance);
  }
}
