import { Scene } from '../scene';
import { Screen } from './screen';

export class Renderer {
  private scene: Scene;
  private screen: Screen;

  constructor(scene: Scene, id: string, width: number, height: number) {
    this.scene = scene;
    this.screen = new Screen(id, width, height);
  }

  draw() {
    
  }
}
