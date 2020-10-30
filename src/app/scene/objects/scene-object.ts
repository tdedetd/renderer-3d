import { Mesh } from '../mesh';
import { ObjectProperties } from "../object-properties";

export interface SceneObject {
  properties: ObjectProperties;
  getMeshes(): Mesh[];
}
