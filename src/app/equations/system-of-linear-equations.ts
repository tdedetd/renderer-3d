import { LinearEquation } from "./linear-equation";
import { listUtils } from '../utils';
import { EquationError } from '../errors';
import { Matrix3x3 } from '../matrix';

export class SystemOfLinearEquations {

  equations: LinearEquation[];

  constructor(equations: LinearEquation[]) {
    this.equations = equations;

    const lengthsOfCoefficients = equations.map(eq => eq.coefficients.length);
    if (!listUtils.areElementsEqual(lengthsOfCoefficients)) {
      throw new EquationError(`Different numbers of coefficients: ${lengthsOfCoefficients}`);
    }
  }

  public getSolution(): number[] {
    // by Cramer's rule

    // TODO: universalize. Only for 3x3 now
    const matrix = new Matrix3x3(this.equations.map(eq => eq.coefficients));

    const mainDeterminant = matrix.getDeterminant();
    if (mainDeterminant === 0) return null;
    const solution: number[] = [];

    for (let columnIndex = 0; columnIndex < matrix.columns; columnIndex++) {
      const valuesForMatrix: number[][] = [];

      for (let i = 0; i < this.equations.length; i++) {
        const rowValues = this.equations[i].coefficients.slice();
        rowValues[columnIndex] = -this.equations[i].constant;
        valuesForMatrix.push(rowValues);
      }

      solution.push(new Matrix3x3(valuesForMatrix).getDeterminant() / mainDeterminant);
    }
    return solution;
  }
}
