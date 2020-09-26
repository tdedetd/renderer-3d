import { Rotation } from "./rotation";
import { Mesh } from './mesh';
import { Color } from "../renderer";
import { Point3d } from "../geometry";

export interface SceneObject {
  color: Color;
  position: Point3d;
  rotation: Rotation;
  getMeshes(): Mesh[];
}
