import { Point3d } from "./point-3d";

export class Triangle3d {

  constructor(public readonly point1: Point3d,
              public readonly point2: Point3d,
              public readonly point3: Point3d) { }
}
