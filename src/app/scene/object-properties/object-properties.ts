import { Point3d } from "../../geometry";
import { Material } from "../material";
import { Rotation } from "../rotation";

export class ObjectProperties {
  position: Point3d;
  rotation: Rotation;
  material: Material;
}
