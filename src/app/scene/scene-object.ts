import { Rotation } from "./rotation";
import { Mesh } from './mesh';
import { Point3d } from "../geometry";
import { Material } from "./material";

export interface SceneObject {
  material: Material;
  position: Point3d;
  rotation: Rotation;
  getMeshes(): Mesh[];
}
