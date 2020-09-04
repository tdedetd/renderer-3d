import { MatrixError } from "../errors";
import { listUtils } from '../utils';

export class Matrix {

  public columns: number;
  public rows: number;
  protected values: number[][];

  constructor(values: number[][]) {
    if (!values) throw new MatrixError('Matrix is empty');
    this.values = values;
    this.calculateSize();
  }

  public getDeterminant(multiplier: number = 1): number {

    if (this.rows === 2 && this.columns === 2) {
      return multiplier * this.values[0][0] * this.values[1][1] - multiplier * this.values[0][1] * this.values[1][0];
    }

    let determinant = 0;

    for (let columnIndex = 0; columnIndex < this.columns; columnIndex++) {

      const matrixValues: number[][] = [];
      for (let rowIndex = 1; rowIndex < this.rows; rowIndex++) {
        const row = this.values[rowIndex].slice();
        row.splice(columnIndex, 1);
        matrixValues.push(row);
      }

      const newMultiplier = multiplier * this.values[0][columnIndex];
      determinant += (columnIndex % 2 === 0 ? 1 : -1) * new Matrix(matrixValues).getDeterminant(newMultiplier);
    }

    return determinant;
  }

  /**
   * Called when matrix doesn't satisfy specific size
   * @param rows
   * @param columns
   */
  protected throwSizeError(rows: number, columns: number) {
    throw new MatrixError(`Matrix must be ${rows} rows and ${columns} columns. Now is ${this.rows}x${this.columns}`);
  }

  private calculateSize() {
    this.rows = this.values.length;
    if (this.rows === 0) throw new MatrixError('There are 0 rows in matrix');

    const lengthsOfRows = this.values.map(row => row.length);

    if (!listUtils.areElementsEqual(lengthsOfRows)) {
      throw new MatrixError(`Lengths of rows are different: ${lengthsOfRows}`);
    }

    if (this.values[0].length === 0) throw new MatrixError('There are 0 columns in matrix');
    this.columns = this.values[0].length;
  }
}
