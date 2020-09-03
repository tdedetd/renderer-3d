export class EquationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EquationError';
  }
}
