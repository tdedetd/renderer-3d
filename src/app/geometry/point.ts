export class Point {

  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }
}
