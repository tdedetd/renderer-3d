import { Line3d, Point3d } from "../geometry";
import { Resolution } from "../misc/resolution";
import { Camera, Scene } from "../scene";
import { Screen } from './screen';
import { Intercection } from './intercection';
import { Color } from "./color";

export class Renderer {

  public lighting = true;
  private screen: Screen;
  private readonly shadowColor = new Color(0, 0, 0);

  constructor(private readonly scene: Scene,
              private readonly canvasId: string,
              private readonly camera: Camera) {}

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

    const materialColor = closestIntercection.material.color;

    if (this.lighting) {
      const lightColor = materialColor.mix(this.shadowColor, 1 - this.getIllumination(closestIntercection.point));
      return lightColor;
    }
    return materialColor.mix(this.scene.backgroundColor, closestIntercection.distance / this.camera.distance);;
  }

  /** Returns level of illumination from 0 to 1 */
  private getIllumination(point: Point3d): number {
    const diffX = point.x > this.scene.lightSource.x ? -0.01 : 0.01;
    const diffY = point.y > this.scene.lightSource.y ? -0.01 : 0.01;
    const diffZ = point.z > this.scene.lightSource.z ? -0.01 : 0.01;
    const lightRay = new Line3d(new Point3d(point.x + diffX, point.y + diffY, point.z + diffZ), this.scene.lightSource);

    const count = this.scene.getObjects().reduce((acc, obj) => acc + obj.getIntercections(lightRay).length, 0);
    return count === 0 ? 1 : 0.5;
  }
}
