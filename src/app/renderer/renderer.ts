import { Scene, Camera } from '../scene';
import { Screen } from './screen';
import { Resolution } from '../resolution';

export class Renderer {
  private background: string;
  private camera: Camera;
  private resolution: Resolution;
  private scene: Scene;
  private screen: Screen;

  constructor(scene: Scene, id: string, camera: Camera, resolution: Resolution) {
    this.camera = camera;
    this.scene = scene;
    this.screen = new Screen(id, resolution, '#eeeeee');
    this.resolution = resolution;
  }

  public getCamera() {
    return this.camera;
  }

  public render() {
    this.screen.clear();

  }
}
