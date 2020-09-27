import { Point3d } from './point-3d';

export class Line3d {

  constructor(public readonly point1: Point3d,
              public readonly point2: Point3d) {}

  public getLength() {
    return Math.sqrt(
      (this.point1.x - this.point2.x) * (this.point1.x - this.point2.x) +
      (this.point1.y - this.point2.y) * (this.point1.y - this.point2.y) +
      (this.point1.z - this.point2.z) * (this.point1.z - this.point2.z));
  }
}
