import { SceneObject } from "./scene-object";
import { Mesh } from "./mesh";

export class Scene {

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
