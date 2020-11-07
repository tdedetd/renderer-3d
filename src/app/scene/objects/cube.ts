import { Mesh } from "../mesh";
import { Line3d, Point3d, PointSpherical, Triangle3d } from "../../geometry";
import { CubeProperties } from "../object-properties";
import { SystemOfLinearEquations3eq3Var } from "../../equations";
import { Intercection } from "../../renderer/intercection";
import { SceneObject } from ".";

const V_ANGLE = Math.atan(1 / Math.sqrt(2)) * 180 / Math.PI;

export class Cube implements SceneObject {

  private meshes: Mesh[];

  constructor(public properties: CubeProperties) {
    this.meshes = this.getMeshes();
  }

  getIntercections(ray: Line3d) {

    const intercections: Intercection[] = [];

    this.meshes.forEach(mesh => {
      const equationSystem = new SystemOfLinearEquations3eq3Var([
        ...ray.getEquations(), mesh.triangle.getPlaneEquation()
      ]);

      const point = this.getIntercectionPoint(equationSystem);
      if (!point || !mesh.triangle.pointInside(point)) return;

      const inInterval = point.x > ray.point1.x && point.x < ray.point2.x || point.x > ray.point2.x && point.x < ray.point1.x;
      if (!inInterval) return;

      intercections.push(new Intercection(mesh.material, point, new Line3d(point, ray.point1).getLength()));
    });

    return intercections;
  }

  // TODO: to get intercections with meshes class
  private getIntercectionPoint(equationSystem: SystemOfLinearEquations3eq3Var): Point3d {
    const solution = equationSystem.getSolution();
    if (!solution) return null;
    return new Point3d(solution[0], solution[1], solution[2]);
  }

  private getMeshes(): Mesh[] {
    const meshes: Mesh[] = [];
    const radius = 0.5 * this.properties.width / Math.sin(V_ANGLE * Math.PI / 180);

    // TODO: rotation
    const vertices: Point3d[] = [];

    [-V_ANGLE, V_ANGLE].forEach(vAngle => {
      for (let hAngle = 45; hAngle < 360; hAngle += 90) {
        vertices.push(new PointSpherical(radius, vAngle, hAngle).toCartesian(this.properties.position));
      }
    });

    meshes.push(
      new Mesh(new Triangle3d(vertices[3], vertices[7], vertices[4]), this.properties.material),
      new Mesh(new Triangle3d(vertices[3], vertices[0], vertices[4]), this.properties.material),
      new Mesh(new Triangle3d(vertices[0], vertices[4], vertices[5]), this.properties.material),
      new Mesh(new Triangle3d(vertices[0], vertices[1], vertices[5]), this.properties.material),
      new Mesh(new Triangle3d(vertices[1], vertices[5], vertices[6]), this.properties.material),
      new Mesh(new Triangle3d(vertices[1], vertices[2], vertices[6]), this.properties.material),
      new Mesh(new Triangle3d(vertices[2], vertices[6], vertices[7]), this.properties.material),
      new Mesh(new Triangle3d(vertices[2], vertices[3], vertices[7]), this.properties.material),
      new Mesh(new Triangle3d(vertices[0], vertices[1], vertices[2]), this.properties.material),
      new Mesh(new Triangle3d(vertices[0], vertices[3], vertices[2]), this.properties.material),
      new Mesh(new Triangle3d(vertices[5], vertices[6], vertices[7]), this.properties.material),
      new Mesh(new Triangle3d(vertices[5], vertices[4], vertices[7]), this.properties.material)
    );

    return meshes;
  }

}
