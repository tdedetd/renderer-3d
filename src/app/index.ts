import { Camera } from "./scene/camera";

const camera = new Camera();
const t0 = performance.now();
const rays = camera.getRays(640, 480);
const t1 = performance.now();

console.log('rays', rays);
console.log(`time - ${t1 - t0} ms`);
