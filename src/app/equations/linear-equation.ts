export class LinearEquation {

  public coefficients: number[];

  // before equals
  public constant: number;

  constructor(coefficients: number[], constant: number) {
    this.coefficients = coefficients;
    this.constant = constant;
  }
}
