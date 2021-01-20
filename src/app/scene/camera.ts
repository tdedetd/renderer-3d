import { Line3d, Point3d } from '../geometry';
import { Rotator } from '../misc';
import { Resolution } from '../misc/resolution';
import { Rotation } from './rotation';

export class Camera {

  get position(): Point3d {
    return this._position;
  }

  set position(value: Point3d) {
    this._position = value;
    this.updateCanvasConfig();
  }

  get rotation(): Rotation {
    return this._rotation;
  }

  set rotation(value: Rotation) {
    this._rotation = value;
    this.updateCanvasConfig();
  }

  get fov(): number {
    return this._fov;
  }

  set fov(value: number) {
    this._fov = value;
    this.updateCanvasConfig();
  }

  get distance(): number {
    return this._distance;
  }

  set distance(value: number) {
    this._distance = value;
    this.updateCanvasConfig();
  }

  get resolution(): Resolution {
    return this._resolution;
  }

  set resolution(value: Resolution) {
    this._resolution = value;
    this.updateCanvasConfig();
  }

  public _position: Point3d = new Point3d(0, 0, 0);
  public _rotation: Rotation = new Rotation(0, 0, 0);
  public _fov: number = 90;
  public _distance: number = 100;
  public _resolution: Resolution = new Resolution(320, 240);

  /** Global width of canvas on scene */
  private canvasWidth: number;

  /** Global height of canvas on scene */
  private canvasHeight: number;

  /** Global size of 1 pixel on scene */
  private canvasPixelSize: number;

  /** Global X when camera has no rotation */
  private canvasCoordX: number;

  private rotator: Rotator;

  constructor() {
    this.rotator = new Rotator(this._position);
  }

  /** The first point is always position of camera */
  public generateRay(x: number, y: number): Line3d {

    const coordY = (this.canvasPixelSize * x + this.canvasPixelSize / 2) - this.canvasWidth / 2;
    const coordZ = (this.canvasPixelSize * (this._resolution.height - y) + this.canvasPixelSize / 2) - this.canvasHeight / 2;

    return new Line3d(this._position, this.rotator.rotatePoint(this._rotation, new Point3d(this.canvasCoordX, coordY, coordZ)));
  }

  private updateCanvasConfig() {
    this.canvasWidth = 2 * this._distance * Math.tan(this._fov / 2 * Math.PI / 180);
    this.canvasPixelSize = this.canvasWidth / this._resolution.width;
    this.canvasHeight = this.canvasPixelSize * this._resolution.height;
    this.canvasCoordX = this._position.x + this._distance;
    this.rotator = new Rotator(this._position);
  }
}
