import { Point } from '../geometry';
import { RendererError } from '../errors';
import { Resolution } from '../misc/resolution';
import { Color } from './color';

export class Screen {

  private readonly background: string;
  private readonly canvasEl: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  public resolution: Resolution;

  constructor(id: string, resolution: Resolution, background: string = 'black') {
    this.resolution = resolution;
    this.background = background;
    this.canvasEl = <HTMLCanvasElement>document.getElementById(id);
    if (!this.canvasEl) throw new RendererError(`Element '${id}' not found!`);

    this.canvasEl.width = resolution.width;
    this.canvasEl.height = resolution.height;
    this.context = this.canvasEl.getContext('2d');
  }

  public clear() {
    this.context.fillStyle = this.background;
    this.context.fillRect(0, 0, this.resolution.width, this.resolution.height);
  }

  public drawLine(point1: Point, point2: Point) {
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.stroke();
  }

  public drawPixel(x: number, y: number, color: Color) {
    this.context.fillStyle = color.toString();
    this.context.fillRect(x, y, 1, 1);
  }
}
