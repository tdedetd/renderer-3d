import { Triangle3d } from "../geometry";
import { Color } from "../renderer";

export class Mesh {

  constructor(public readonly triangle: Triangle3d,
              public readonly color: Color) {}
}
