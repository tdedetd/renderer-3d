import { SceneObject } from "./scene-object";
import { Mesh } from "./mesh";
import { Color } from "../renderer";

export class Scene {

  public readonly backgroundColor: Color = new Color(0, 0, 0);
  private objects: SceneObject[] = [];

  public getMeshes(): Mesh[] {
    const meshes: Mesh[] = [];
    this.objects.forEach(object => meshes.push(...object.getMeshes()));
    return meshes;
  }

  public addObjects(...objects: SceneObject[]) {
    objects.push(...objects);
  }
}
