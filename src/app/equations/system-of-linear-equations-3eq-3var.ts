import { EquationError } from '../errors';
import { Matrix3x3 } from '../matrix';
import { LinearEquation } from './linear-equation';
import { SystemOfLinearEquations } from './system-of-linear-equations';

// TODO: generic for Matrix to class
export class SystemOfLinearEquations3eq3Var extends SystemOfLinearEquations {

  constructor(equations: LinearEquation[]) {
    super(equations);

    if (equations.length !== 3) throw new EquationError('The number of equations must be 3. Now - ' + equations.length);
    if (equations[0].coefficients.length !== 3) throw new EquationError('The number of variables must be 3. Now - ' + equations.length);
  }

  /**
   * Returns null, if system has no solutions
   */
  public getSolution(): number[] {
    // by Cramer's rule

    const v = this.equations.map(eq => eq.coefficients);
    const matrix = new Matrix3x3(v);

    const mainDeterminant = matrix.getDeterminant();
    if (mainDeterminant === 0) return null;

    const matrix1 = new Matrix3x3([
      [ -this.equations[0].constant, v[0][1], v[0][2] ],
      [ -this.equations[1].constant, v[1][1], v[1][2] ],
      [ -this.equations[2].constant, v[2][1], v[2][2] ]
    ]);

    const matrix2 = new Matrix3x3([
      [ v[0][0], -this.equations[0].constant, v[0][2] ],
      [ v[1][0], -this.equations[1].constant, v[1][2] ],
      [ v[2][0], -this.equations[2].constant, v[2][2] ]
    ]);

    const matrix3 = new Matrix3x3([
      [ v[0][0], v[0][1], -this.equations[0].constant ],
      [ v[1][0], v[1][1], -this.equations[1].constant ],
      [ v[2][0], v[2][1], -this.equations[2].constant ]
    ]);

    return [
      matrix1.getDeterminant() / mainDeterminant,
      matrix2.getDeterminant() / mainDeterminant,
      matrix3.getDeterminant() / mainDeterminant
    ];
  }
}
