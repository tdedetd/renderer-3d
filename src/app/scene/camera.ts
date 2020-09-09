import { Line, Point3d, PointSpherical } from '../geometry';
import { Rotation } from './rotation';

export class Camera {

  public position: Point3d = new Point3d(0, 0, 0);
  public rotation: Rotation = new Rotation(0, 0);
  public fov: number = 90;
  public distance: number = 100;

  public getRays(width: number, height: number): Line[][] {
    const rays: Line[][] = [];
    const vfov = this.getVerticalFov(width, height);

    const startAngleZ = this.rotation.z - this.fov / 2 + this.fov / 2 / width;
    const startAngleY = this.rotation.y - vfov / 2 + vfov / 2 / height;

    for (let y = 0; y < height; y++) {
      const line: Line[] = [];
      for (let x = 0; x < width; x++) {
        const angleZ = startAngleZ + this.fov * x / width;
        const angleY = startAngleY + vfov * y / height;
        const pointSpherical = new PointSpherical(this.distance, angleY, angleZ);
        line.push(new Line(this.position, pointSpherical.toCartesian(this.position)));
      }
      rays.push(line);
    }
    return rays;
  }

  private getVerticalFov(width: number, height: number): number {
    const aspectRatio = height / width;
    const fovRad = this.fov * Math.PI / 180;
    const vFovRad = 2 * Math.atan(Math.tan(fovRad / 2) * aspectRatio);
    return vFovRad * 180 / Math.PI;
  }
}
