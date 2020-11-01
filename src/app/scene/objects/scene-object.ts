import { Line3d } from '../../geometry';
import { Intercection } from '../../renderer/intercection';
import { ObjectProperties } from "../object-properties";

export interface SceneObject {
  properties: ObjectProperties;
  getIntercections(ray: Line3d): Intercection[];
}
