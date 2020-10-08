import { Triangle3d } from "../geometry";
import { Material } from "./material";

export class Mesh {

  constructor(public readonly triangle: Triangle3d,
              public readonly material: Material) {}
}
