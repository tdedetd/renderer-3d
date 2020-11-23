import { Line3d } from '../../geometry';
import { Intercection } from '../../renderer/intercection';
import { ObjectProperties } from "../object-properties";

export interface SceneObject {
  properties: ObjectProperties;

  /** If there are not intercections, empty list will return */
  getIntercections(ray: Line3d): Intercection[];
}
