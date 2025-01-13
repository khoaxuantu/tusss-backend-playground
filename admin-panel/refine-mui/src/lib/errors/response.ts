const DELIMITER = ": ";

export enum ERROR_RESPONSE_STATUS {
  INTERNAL_SERVER = 500,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  INSUFFICIENT_STORAGE = 507,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

const STATUS_TEXT: Record<ERROR_RESPONSE_STATUS, string> = {
  500: "Internal Server Error",
  400: "Bad Request",
  404: "Not Found",
  401: "Unauthorized",
  403: "Forbidden",
  405: "Method Not Allowed",
  409: "Conflict",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  507: "Insufficient Storage",
  511: "Network Authentication Required",
};

function statusText(status: ERROR_RESPONSE_STATUS, message: string) {
  return STATUS_TEXT[status] + `${DELIMITER}${message}`;
}

export class ErrorResponse {
  static internalServer(message: string) {
    return ErrorResponse.create(ERROR_RESPONSE_STATUS.INTERNAL_SERVER, message);
  }

  static create(status: ERROR_RESPONSE_STATUS, message: string) {
    return Response.json({}, { status, statusText: statusText(status, message) });
  }
}
