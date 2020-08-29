import { Color } from "./color";

export class Bitmap {

  width: number;
  height: number;
  values: Color[][] = [];

  constructor(width: number, height: number, defaultColor?: Color) {
    if (!defaultColor) defaultColor = new Color(0, 0, 0);

    this.width = width;
    this.height = height;
    this.fill(defaultColor);
  }

  private fill(defaultColor: Color) {
    for (let x = 0; x < this.width; x++) {
      const row: Color[] = [];

      for (let y = 0; y < this.height; y++) {
        row.push(defaultColor);
      }

      this.values.push(row);
    }
  }
}
