import { Line3d, Point3d, PointSpherical } from '../geometry';
import { Rotation } from './rotation';

export class Camera {

  public position: Point3d = new Point3d(0, 0, 0);
  public rotation: Rotation = new Rotation(0, 0, 0);
  public fov: number = 90;
  public distance: number = 100;
  private screenDistance = 10;

  public getRays(width: number, height: number): Line3d[][] {
    const rays: Line3d[][] = [];
    const vfov = this.getVerticalFov(width, height);

    for (let y = 0; y < height; y++) {
      const angleY = this.rotation.y + this.getAngle(y, height, vfov);

      const lines: Line3d[] = [];
      for (let x = 0; x < width; x++) {
        const angleZ = this.rotation.z + this.getAngle(x, width, this.fov);
        const pointSpherical = new PointSpherical(this.distance, angleY, angleZ);
        lines.push(new Line3d(this.position, pointSpherical.toCartesian(this.position)));
      }
      rays.push(lines);
    }
    return rays;
  }

  private getVerticalFov(width: number, height: number): number {
    const aspectRatio = height / width;
    const fovRad = this.fov * Math.PI / 180;
    const vFovRad = 2 * Math.atan(Math.tan(fovRad / 2) * aspectRatio);
    return vFovRad * 180 / Math.PI;
  }

  private getAngle(screenCoord: number, screenLength: number, fov: number): number {
    const relationalCoord = screenCoord - Math.floor(screenLength / 2);
    const screenDistanceToCoord = Math.abs(relationalCoord) - 0.5 + (relationalCoord >= 0 ? 1 : 0);
    const globalLength = this.screenDistance * Math.tan((fov / 2) * Math.PI / 180);
    const globalDistanceToCoord = globalLength * screenDistanceToCoord / (screenLength / 2);
    const angle = Math.atan((globalDistanceToCoord / this.screenDistance)) * 180 / Math.PI;

    return relationalCoord >= 0 ? angle : -angle;
  }
}
