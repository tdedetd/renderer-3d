import { Point, Point3d, Vector } from "../geometry";
import { Resolution, Rotator } from "../misc";
import { Camera, Rotation } from "../scene";
import { Color } from "./color";
import { Screen } from "./screen";

export class AxesRenderer {

  private rotator: Rotator;
  private screen: Screen;

  constructor(private readonly canvasId: string) {
    this.rotator = new Rotator();
    this.screen = new Screen(this.canvasId, new Resolution(320, 240), 'transparent');
  }

  public render(camera: Camera) {

    const cameraPosition = new Point3d(-2, 0, 0);
    const vfov = this.getVerticalFov(camera);

    const camDirPoint = new Point3d(0, 0, 0).subtract(cameraPosition);
    const inverseRotation = new Rotation(-camera.rotation.x, -camera.rotation.y, -camera.rotation.z);
    const xAxisEnd = this.rotator.rotatePoint(inverseRotation, new Point3d(1, 0, 0)).subtract(cameraPosition);
    const yAxisEnd = this.rotator.rotatePoint(inverseRotation, new Point3d(0, 1, 0)).subtract(cameraPosition);
    const zAsisEnd = this.rotator.rotatePoint(inverseRotation, new Point3d(0, 0, 1)).subtract(cameraPosition);

    const xScreenEnd = this.getAxisEndScreenPoint(camDirPoint, xAxisEnd, camera.fov, vfov);
    const yScreenEnd = this.getAxisEndScreenPoint(camDirPoint, yAxisEnd, camera.fov, vfov);
    const zScreenEnd = this.getAxisEndScreenPoint(camDirPoint, zAsisEnd, camera.fov, vfov);

    const centralPoint = new Point(this.screen.resolution.width / 2, this.screen.resolution.height / 2);

    const shadowColor = new Color(0, 0, 0);
    this.screen.clear();

    this.screen.drawLine(centralPoint, xScreenEnd, shadowColor, 6);
    this.screen.drawLine(centralPoint, yScreenEnd, shadowColor, 6);
    this.screen.drawLine(centralPoint, zScreenEnd, shadowColor, 6);

    this.screen.drawLine(centralPoint, xScreenEnd, new Color(255, 0, 0), 4);
    this.screen.drawLine(centralPoint, yScreenEnd, new Color(0, 255, 0), 4);
    this.screen.drawLine(centralPoint, zScreenEnd, new Color(0, 0, 255), 4);
  }

  private getAxisEndScreenPoint(camDirPoint: Point3d, dirPoint: Point3d, hfov: number, vfov: number): Point {

    let hAngle = new Vector(camDirPoint).getAngle(new Vector(new Point3d(dirPoint.x, dirPoint.y, 0)));
    let vAngle = new Vector(camDirPoint).getAngle(new Vector(new Point3d(dirPoint.x, 0, dirPoint.z)));

    if (dirPoint.y < 0) hAngle = -hAngle;
    if (dirPoint.z < 0) vAngle = -vAngle;

    const x = this.screen.resolution.width * (hAngle + hfov / 2) / hfov;
    const y = this.screen.resolution.height - (this.screen.resolution.height * (vAngle + vfov / 2) / vfov);

    // console.log(
    //   'camDirPoint', camDirPoint, 'dirPoint', dirPoint,
    //   `\nhfov`, hfov, 'vfov', vfov,
    //   `\nhAngle`, hAngle, 'vAngle', vAngle,
    //   `\nx`, x, 'y', y
    // );

    return new Point(x, y);
  }

  private getVerticalFov(camera: Camera): number {
    const aspectRatio = camera.resolution.height / camera.resolution.width;
    const fovRad = camera.fov * Math.PI / 180;
    const vFovRad = 2 * Math.atan(Math.tan(fovRad / 2) * aspectRatio);
    return vFovRad * 180 / Math.PI;
  }
}
