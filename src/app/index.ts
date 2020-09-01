import { Bitmap } from "./bitmap";
import { Screen } from "./screen";
import { Matrix3x3 } from './matrix';

const bitmap = new Bitmap(640, 480);
const screen = new Screen('canvas');
screen.draw(bitmap);

const values = [
  [ -4, 2, 0 ],
  [ 3, 10, -5 ],
  [ 1, 2, 2 ]
];
const matrix = new Matrix3x3(values);
console.log('det', matrix.getDeterminant());
