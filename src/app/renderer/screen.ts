import { Point } from '../geometry';

export class Screen {

  private canvasEl: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(id: string, width: number, height: number) {
    this.canvasEl = <HTMLCanvasElement>document.getElementById(id);
    if (!this.canvasEl) throw new Error(`Element '${id}' not found!`);

    this.canvasEl.width = width;
    this.canvasEl.height = height;

    this.context = this.canvasEl.getContext('2d');
  }

  public drawLine(point1: Point, point2: Point) {
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.stroke();
  }
}
