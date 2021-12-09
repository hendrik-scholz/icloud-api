import { ErrorResponse } from '../../types';

export class ErrorResponseService {
  public static getErrorResponse(
    status: number,
    endpoint: string,
    title: string,
    detail: string): ErrorResponse {
    return {
      errors: [
        {
          status: `${status}`,
          source: {
            pointer: endpoint,
          },
          title,
          detail,
        },
      ],
    };
  }
}
