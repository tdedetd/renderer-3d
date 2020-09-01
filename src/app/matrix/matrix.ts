import { MatrixError } from "../errors";

export class Matrix {

  protected columns: number;
  protected rows: number;
  protected values: number[][];

  constructor(values: number[][]) {
    if (!values) throw new MatrixError('Matrix is empty');
    this.values = values;
    this.calculateSize();
  }

  public getDeterminant(): number {
    return 0;
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

    const rowLengths = this.values.map(row => row.length);

    rowLengths.reduce((prevLength, currLength) => {
      if (prevLength !== currLength) throw new MatrixError(`Lengths of rows are different: ${rowLengths}`);
      return currLength;
    });

    if (this.values[0].length === 0) throw new MatrixError('There are 0 columns in matrix');
    this.columns = this.values[0].length;
  }
}
