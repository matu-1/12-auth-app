export class ErrorResponse {
  constructor(
    public statusCode: number,
    public message: string,
    public type: 'warning' | 'error' = 'warning'
  ) {}
}
