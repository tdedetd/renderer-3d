import { SceneObject } from "./scene-object";
import { Rotation } from "./rotation";
import { Mesh } from "./mesh";
import { Color } from "../renderer";
import { Point3d, PointSpherical, Triangle3d } from "../geometry";

export class Cube implements SceneObject {

  constructor(public color: Color,
              public position: Point3d,
              public rotation: Rotation,
              public width: number) {}

  getMeshes(): Mesh[] {
    const meshes: Mesh[] = [];
    const halfWidth = this.width / 2;
    const diagonal = halfWidth * Math.sqrt(3);

    // TODO: rotation
    const vertices: Point3d[] = [];

    [-45, 45].forEach(vAngle => {
      for (let hAngle = 45; hAngle < 360; hAngle += 90) {
        vertices.push(new PointSpherical(diagonal, hAngle, vAngle).toCartesian(this.position));
      }
    });

    meshes.push(
      new Mesh(new Triangle3d(vertices[3], vertices[7], vertices[4]), this.color),
      new Mesh(new Triangle3d(vertices[3], vertices[0], vertices[4]), this.color),
      new Mesh(new Triangle3d(vertices[0], vertices[4], vertices[5]), this.color),
      new Mesh(new Triangle3d(vertices[0], vertices[1], vertices[5]), this.color),
      new Mesh(new Triangle3d(vertices[1], vertices[5], vertices[6]), this.color),
      new Mesh(new Triangle3d(vertices[1], vertices[2], vertices[6]), this.color),
      new Mesh(new Triangle3d(vertices[2], vertices[6], vertices[7]), this.color),
      new Mesh(new Triangle3d(vertices[2], vertices[3], vertices[7]), this.color),
      new Mesh(new Triangle3d(vertices[0], vertices[1], vertices[2]), this.color),
      new Mesh(new Triangle3d(vertices[0], vertices[3], vertices[2]), this.color),
      new Mesh(new Triangle3d(vertices[5], vertices[6], vertices[7]), this.color),
      new Mesh(new Triangle3d(vertices[5], vertices[4], vertices[7]), this.color)
    );

    return meshes;
  }

}
