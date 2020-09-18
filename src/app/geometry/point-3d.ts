export class Point3d {

  constructor(public readonly x: number,
              public readonly y: number,
              public readonly z: number) {}

  public add(point: Point3d): Point3d {
    return new Point3d(this.x + point.x, this.y + point.y, this.z + point.z);
  }
}
