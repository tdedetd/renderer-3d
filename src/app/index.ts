import { SystemOfLinearEquations, LinearEquation } from "./equations";

const systemOfEquations = new SystemOfLinearEquations([
  new LinearEquation([1, -1, 0], 3),
  new LinearEquation([5, 0, 2], 8),
  new LinearEquation([3, 0, -1], 7)
]);
console.log('solution', systemOfEquations.getSolution());
