export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const Errors = {
  unauthorized: (msg = "Authentication required") =>
    new ApiError(401, "UNAUTHORIZED", msg),
  forbidden: (msg = "Insufficient permissions") =>
    new ApiError(403, "FORBIDDEN", msg),
  notFound: (resource: string) =>
    new ApiError(404, "NOT_FOUND", `${resource} not found`),
  validation: (details: unknown) =>
    new ApiError(422, "VALIDATION_ERROR", "Invalid input", details),
  rateLimited: () => new ApiError(429, "RATE_LIMITED", "Too many requests"),
  internal: (msg = "Internal server error") =>
    new ApiError(500, "INTERNAL_ERROR", msg),
};
