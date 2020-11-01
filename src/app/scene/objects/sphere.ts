import { SceneObject } from ".";
import { QuadraticEquation } from "../../equations";
import { Line3d, Point3d } from "../../geometry";
import { Intercection } from "../../renderer/intercection";
import { SphereProperties } from "../object-properties";

export class Sphere implements SceneObject {

  constructor(public properties: SphereProperties) { }

  getIntercections(ray: Line3d): Intercection[] {
    const p1 = ray.point1, p2 = ray.point2, v = p2.subtract(p1), o = this.properties.position, r = this.properties.radius;
    const x0 = o.x, y0 = o.y, z0 = o.z, x1 = p1.x, y1 = p1.y, z1 = p1.z;

    const a = v.x * v.x + v.y * v.y + v.z * v.z;
    const b = 2 * (x1 * v.x - x0 * v.x + y1 * v.y - y0 * v.y + z1 * v.z - z0 * v.z);
    const c = x0 * x0 + x1 * x1 + y0 * y0 + y1 * y1 + z0 * z0 + z1 * z1 - r * r - 2 * (x0 * x1 + y0 * y1 + z0 * z1);

    const solutions = new QuadraticEquation(a, b, c).solve();
    if (!solutions) return [];

    return solutions.map(solution => {
      const point = new Point3d(x1 + v.x * solution, y1 + v.y * solution, z1 + v.z * solution);
      return new Intercection(this.properties.material, point, new Line3d(ray.point1, point).getLength());
    });
  }
}
