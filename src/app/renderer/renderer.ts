import { Scene } from '../scene';
import { Screen } from './screen';
import { Point } from '../geometry';

export class Renderer {
  private scene: Scene;
  private screen: Screen;

  constructor(scene: Scene, id: string, width: number, height: number) {
    this.scene = scene;
    this.screen = new Screen(id, width, height);
  }

  public draw() {
    this.drawOutlines();
  }

  private drawOutlines() {
    const camera = this.scene.getCamera();
    const outlines = this.scene.getOutlines();
    const borders = camera.getScreenBorders(screen.width, screen.height);

    outlines.forEach(outline => {
      const pointSpherical1 = outline.point1.toSpherical(camera.position);
      const pointSpherical2 = outline.point2.toSpherical(camera.position);

      const point1 = new Point(
        this.screen.width * (pointSpherical1.angleHorizontal - borders.zStart) / (borders.zEnd - borders.zStart),
        this.screen.height * (pointSpherical1.angleVertical - borders.yStart) / (borders.yEnd - borders.yStart)
      );

      const point2 = new Point(
        this.screen.width * (pointSpherical2.angleHorizontal - borders.zStart) / (borders.zEnd - borders.zStart),
        this.screen.height * (pointSpherical2.angleVertical - borders.yStart) / (borders.yEnd - borders.yStart)
      );

      this.screen.drawLine(point1, point2);
    });
  }
}
