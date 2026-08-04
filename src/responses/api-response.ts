export class ApiResponse {
  static success(
    data: unknown,
    message = "Success"
  ) {
    return {
      success: true,
      message,
      data,
    };
  }

  static created(
    data: unknown,
    message = "Created successfully."
  ) {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string) {
    return {
      success: false,
      message,
    };
  }
}