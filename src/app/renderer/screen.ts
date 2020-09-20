import { Point } from '../geometry';
import { RendererError } from '../errors';

export class Screen {

  public readonly width: number;
  public readonly height: number;
  private canvasEl: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(id: string, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvasEl = <HTMLCanvasElement>document.getElementById(id);
    if (!this.canvasEl) throw new RendererError(`Element '${id}' not found!`);

    this.canvasEl.width = width;
    this.canvasEl.height = height;

    this.context = this.canvasEl.getContext('2d');
  }

  public clear() {
    this.context.fillStyle = '#eeeeee';
    this.context.fillRect(0, 0, this.width, this.height);
  }

  public drawLine(point1: Point, point2: Point) {
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.stroke();
  }
}
