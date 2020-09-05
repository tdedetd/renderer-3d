import { LinearEquation } from "./linear-equation";
import { listUtils } from '../utils';
import { EquationError } from '../errors';
import { Matrix3x3, SquareMatrix } from '../matrix';

export class SystemOfLinearEquations {

  equations: LinearEquation[];
  MatrixClass: any;

  // Number of variables = number of equations
  constructor(equations: LinearEquation[]) {
    this.equations = equations;

    const numbersOfCoefficients = equations.map(eq => eq.coefficients.length);
    if (!listUtils.areElementsEqual(numbersOfCoefficients)) {
      throw new EquationError(`Different numbers of coefficients: ${numbersOfCoefficients}`);
    }

    this.MatrixClass = numbersOfCoefficients.length === 3 ? Matrix3x3 : SquareMatrix;
  }

  public getSolution(): number[] {
    // by Cramer's rule

    const matrix = new this.MatrixClass(this.equations.map(eq => eq.coefficients));

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

      solution.push(new this.MatrixClass(valuesForMatrix).getDeterminant() / mainDeterminant);
    }
    return solution;
  }
}
