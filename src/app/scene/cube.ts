import { SceneObject } from "./scene-object";
import { Mesh } from "./mesh";
import { Point3d, PointSpherical, Triangle3d } from "../geometry";
import { CubeProperties } from "./object-properties";

const V_ANGLE = Math.atan(1 / Math.sqrt(2)) * 180 / Math.PI;

export class Cube implements SceneObject {

  constructor(public properties: CubeProperties) {}

  getMeshes(): Mesh[] {
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
