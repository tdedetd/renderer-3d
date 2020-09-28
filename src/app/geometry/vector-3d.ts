import { Point3d } from "./point-3d";

export class Vector {

  constructor(public readonly point: Point3d) {}

  /**
   * @param vector other vector
   * @returns angle between two vectors in degrees
   */
  public getAngle(vector: Vector): number {
    if (this === vector) return 0;

    const x1 = this.point.x, y1 = this.point.y, z1 = this.point.z,
          x2 = vector.point.x, y2 = vector.point.y, z2 = vector.point.z;

    const expr = (x1 * x2 + y1 * y2 + z1 * z2) /
                 (Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1) * Math.sqrt(x2 * x2 + y2 * y2 + z2 * z2));

    return Math.acos(expr) * 180 / Math.PI;
  }
}
