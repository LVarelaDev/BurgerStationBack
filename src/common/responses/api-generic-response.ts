export class ApiGenericResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string, data?: T): ApiGenericResponse<T> {
    return new ApiGenericResponse(true, message, data);
  }

  static error<T>(message: string, data?: T): ApiGenericResponse<T> {
    return new ApiGenericResponse(false, message, data);
  }
}
