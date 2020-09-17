export class Rotation {

  /** Lengthwise rotation */
  public x: number;
  /** Vertical rotation */
  public y: number;
  /** Horizontal rotation */
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
