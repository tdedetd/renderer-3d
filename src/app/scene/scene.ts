import { SceneObject } from "./objects";
import { Color } from "../renderer";
import { Point3d } from "../geometry";

export class Scene {

  public backgroundColor: Color = new Color(0, 0, 0);
  public lightSource: Point3d = new Point3d(0, 0, 0);

  private objects: SceneObject[] = [];

  public addObjects(...objects: SceneObject[]) {
    this.objects.push(...objects);
  }

  public getObjects() {
    return this.objects;
  }
}
