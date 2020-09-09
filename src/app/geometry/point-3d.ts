export class Point3d {

  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public add(point: Point3d): Point3d {
    return new Point3d(this.x + point.x, this.y + point.y, this.z + point.z);
  }
}
