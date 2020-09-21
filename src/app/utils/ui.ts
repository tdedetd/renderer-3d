import { Renderer } from '../renderer';
import { Point3d } from '../geometry';
import { Rotation } from '../scene/rotation';

export function init(renderer: Renderer) {
  const camera = renderer.getCamera();

  const form = {
    position: {
      x: <HTMLInputElement>byId('input-position-x'),
      y: <HTMLInputElement>byId('input-position-y'),
      z: <HTMLInputElement>byId('input-position-z')
    },
    rotation: {
      y: <HTMLInputElement>byId('input-rotation-y'),
      z: <HTMLInputElement>byId('input-rotation-z')
    },
    fov: <HTMLInputElement>byId('input-fov'),
    time: <HTMLDivElement>byId('div-time')
  };

  form.position.x.value = String(camera.position.x);
  form.position.y.value = String(camera.position.y);
  form.position.z.value = String(camera.position.z);
  form.rotation.y.value = String(camera.rotation.y);
  form.rotation.z.value = String(camera.rotation.z);
  form.fov.value = String(camera.fov);

  byId('button-draw').addEventListener('click', () => {
    camera.position = new Point3d(+form.position.x.value, +form.position.y.value, +form.position.z.value);
    camera.rotation = new Rotation(0, +form.rotation.y.value, +form.rotation.z.value);
    camera.fov = +form.fov.value;
    updateTime(form.time, renderer.render());
  });

  updateTime(form.time, renderer.render());
}

function byId(id: string) {
  return document.getElementById(id);
}

function updateTime(element: HTMLDivElement, time: number) {
  element.innerText = (time / 1000).toFixed(3) + ' s';
}
