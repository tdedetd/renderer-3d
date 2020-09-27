import { Point3d } from "../geometry";
import { Mesh } from "../scene";

export class Intercection {

  constructor(public readonly mesh: Mesh,
              public readonly point: Point3d,
              public readonly distance: number) {}
}
