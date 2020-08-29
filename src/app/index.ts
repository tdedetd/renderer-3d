import { Bitmap } from "./bitmap";
import { Screen } from "./screen";

const bitmap = new Bitmap(640, 480);
const screen = new Screen('canvas');

console.log('bitmap', bitmap);
console.log('screen', screen);

screen.draw(bitmap);
