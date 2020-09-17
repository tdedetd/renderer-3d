import { Point3d } from "./point-3d";

export class Line3d {

  public readonly point1: Point3d;
  public readonly point2: Point3d;

  constructor(point1: Point3d, point2: Point3d) {
    this.point1 = point1;
    this.point2 = point2;
  }
}
