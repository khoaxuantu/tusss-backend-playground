const DELIMITER = ": ";
const STATUS_TEXT: Record<number, string> = {
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

function statusText(status: number, message: string) {
  return STATUS_TEXT[status] + `${DELIMITER}${message}`;
}

export class ErrorResponse {
  static internalServer(message: string) {
    return Response.json({}, { status: 500, statusText: statusText(500, message) });
  }
}
