export class Point {

  constructor(public readonly x: number,
              public readonly y: number) {}

  public add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }
}
