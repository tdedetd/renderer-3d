import { Mesh } from ".";
import { SystemOfLinearEquations3eq3Var } from "../equations";
import { Line3d, Point3d } from "../geometry";
import { Intercection } from "../renderer/intercection";

export class MeshIntercectionDetector {

  public static getIntercections(ray: Line3d, meshes: Mesh[]): Intercection[] {

    const intercections: Intercection[] = [];

    meshes.forEach(mesh => {
      const equationSystem = new SystemOfLinearEquations3eq3Var([
        ...ray.getEquations(), mesh.triangle.getPlaneEquation()
      ]);

      const point = MeshIntercectionDetector.getIntercectionPoint(equationSystem);
      if (!point || !mesh.triangle.pointInside(point)) return;

      const inInterval = point.x > ray.point1.x && point.x < ray.point2.x || point.x > ray.point2.x && point.x < ray.point1.x;
      if (!inInterval) return;

      intercections.push(new Intercection(mesh.material, point, new Line3d(point, ray.point1).getLength()));
    });

    return intercections;
  }

  private static getIntercectionPoint(equationSystem: SystemOfLinearEquations3eq3Var): Point3d {
    const solution = equationSystem.getSolution();
    if (!solution) return null;
    return new Point3d(solution[0], solution[1], solution[2]);
  }
}
