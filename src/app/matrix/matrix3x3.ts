import { SquareMatrix } from './square-matrix';

export class Matrix3x3 extends SquareMatrix {

  constructor(values: number[][]) {
    super(values);

    const requiredRows = 3;
    const requiredColumns = 3;
    if (this.rows !== requiredRows || this.columns !== requiredColumns) {
      this.throwSizeError(requiredRows, requiredColumns);
    }
  }

  public getDeterminant(): number {
    const v = this.values;
    return v[0][0] * v[1][1] * v[2][2] + v[0][1] * v[1][2] * v[2][0] + v[0][2] * v[1][0] * v[2][1]
      - v[0][2] * v[1][1] * v[2][0] - v[0][1] * v[1][0] * v[2][2] - v[0][0] * v[1][2] * v[2][1];
  }
}
