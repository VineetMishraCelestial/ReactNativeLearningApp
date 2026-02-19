export enum ApiErrorType {
    NETWORK = 'NETWORK_ERROR',
    TIMEOUT = 'TIMEOUT_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    SERVER = 'SERVER_ERROR',
    UNKNOWN = 'UNKNOWN_ERROR',
    BAD_REQUEST = 'BAD_REQUEST',
  }
  
  export class ApiError extends Error {
    type: ApiErrorType;
    statusCode?: number;
  
    constructor(
      type: ApiErrorType,
      message: string,
      statusCode?: number
    ) {
      super(message);
      this.type = type;
      this.statusCode = statusCode;
    }
  }
  