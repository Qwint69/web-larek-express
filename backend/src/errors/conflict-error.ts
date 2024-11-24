export class ConflictError extends Error {
  statusCode: number;

  constructor(message = "Ресурс уже существует") {
    super(message);
    this.statusCode = 409;
  }
}
