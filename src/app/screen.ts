import { Bitmap } from "./bitmap";

export class Screen {

  private canvasEl: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(id: string) {
    this.canvasEl = <HTMLCanvasElement>document.getElementById(id);
    if (!this.canvasEl) throw new Error(`Element '${id}' not found!`);

    this.context = this.canvasEl.getContext('2d');
  }

  public draw(bitmap: Bitmap) {
    const width = bitmap.width;
    const height = bitmap.height;

    this.canvasEl.width = width;
    this.canvasEl.height = height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        this.context.fillStyle = bitmap.values[x][y].toString();
        this.context.fillRect(x, y, 1, 1);
      }
    }
  }
}
