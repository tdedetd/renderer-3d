import { Scene, Camera, Mesh } from '../scene';
import { Screen } from './screen';
import { Resolution } from '../resolution';
import { Color } from './color';
import { RendererError } from '../errors';
import { Line3d, Point3d } from '../geometry';
import { Intercection } from './intercection';

export class Renderer {
  private background: string;
  private camera: Camera;
  private resolution: Resolution;
  private scene: Scene;
  private screen: Screen;
  private meshes: Mesh[];

  constructor(scene: Scene, canvasId: string, camera: Camera, resolution: Resolution) {
    this.camera = camera;
    this.scene = scene;
    this.screen = new Screen(canvasId, resolution, '#eeeeee');
    this.resolution = resolution;
  }

  public init() {
    this.meshes = this.scene.getMeshes();
  }

  public getCamera() {
    return this.camera;
  }

  /**
   * @returns time of rendering in miliseconds
   */
  public render(): number {

    if (!this.meshes) throw new RendererError('Renderer is not initialized');

    const t0 = performance.now();
    const rays = this.camera.getRays(this.resolution.width, this.resolution.height);

    this.screen.clear();

    for (let y = 0; y < this.resolution.height; y++) {
      for (let x = 0; x < this.resolution.width; x++) {
        this.screen.drawPixel(x, y, this.getPixel(rays[y][x]));
      }
    }

    return performance.now() - t0;
  }

  private getPixel(ray: Line3d) {
    let closestIntercection: Intercection = null;
    this.meshes.forEach(mesh => {
      const intercection = this.getIntercection(ray, mesh);
      if (intercection && (!closestIntercection || intercection.distance < closestIntercection.distance)) {
        closestIntercection = intercection;
      }
    });

    return closestIntercection ? closestIntercection.mesh.color : this.scene.backgroundColor;
  }

  private getIntercection(ray: Line3d, mesh: Mesh): Intercection {
    return null;
  }
}
