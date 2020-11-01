export class LinearEquation {

  /**
   * Equation which has form a1x1 + ... + anxn + b = 0
   * @param coefficients 
   * @param constant before equals
   */
  constructor(public readonly coefficients: number[],
              public readonly constant: number) {}
}
