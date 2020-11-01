import { Point3d } from "../geometry";
import { Material } from "../scene";

export class Intercection {

  constructor(public readonly material: Material,
              public readonly point: Point3d,
              public readonly distance: number) {}
}
