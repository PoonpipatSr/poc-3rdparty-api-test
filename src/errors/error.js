function formatError(message, status, code) {
  const err = new Error(message);
  err.code = code || null;
  err.statusCode = status;
  return err;
}

export function badRequestError(message = "Bad Request") {
  return formatError(message, 400, "BAD_REQUEST");
}

export function unauthorizedError(message = "Unauthorized") {
  return formatError(message, 401, "UNAUTHORIZED");
}

export function forbiddenError(message = "Forbidden") {
  return formatError(message, 403, "FORBIDDEN");
}

export function notFoundError(message = "Not Found") {
  return formatError(message, 404, "NOT_FOUND");
}

export function conflictError(message = "Conflict") {
  return formatError(message, 409, "CONFLICT");
}

export function internalServerError(message = "Internal Server Error") {
  return formatError(message, 500, "INTERNAL_SERVER_ERROR");
}

export function badGatewayError(message = "Bad Gateway") {
  return formatError(message, 502, "BAD_GATEWAY");
}