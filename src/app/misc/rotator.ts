import { Point3d } from "../geometry";
import { Matrix } from "../matrix";
import { Rotation } from "../scene";

export class Rotator {

  constructor(public readonly pivot: Point3d) {}

  /**
   * Return point rotated by specific angles
   */
  public rotatePoint(rotation: Rotation, point: Point3d): Point3d {
    const vangleRad = rotation.y * Math.PI / 180;
    const hangleRad = rotation.z * Math.PI / 180;
    const point0 = point.subtract(this.pivot);

    const rotationMatrixY = new Matrix([
      [Math.cos(vangleRad), 0, Math.sin(vangleRad)],
      [0, 1, 0],
      [-Math.sin(vangleRad), 0, Math.cos(vangleRad)]
    ]);

    const rotationMatrixZ = new Matrix([
      [Math.cos(hangleRad), -Math.sin(hangleRad), 0],
      [Math.sin(hangleRad), Math.cos(hangleRad), 0],
      [0, 0, 1]
    ]);

    const coordsRotatedY = rotationMatrixY.multiply(new Matrix([[point0.x], [point0.y], [point0.z]]));
    const coordsRotatedYZ = rotationMatrixZ.multiply(coordsRotatedY);
    const x1 = coordsRotatedYZ.values[0][0];
    const y1 = coordsRotatedYZ.values[1][0];
    const z1 = coordsRotatedYZ.values[2][0];

    return new Point3d(x1, y1, z1).add(this.pivot);
  }

  /**
   * Return points rotated by specific angles
   */
  public rotatePoints(rotation: Rotation, points: Point3d[]): Point3d[] {
    return points.map(point => this.rotatePoint(rotation, point));
  }
}
