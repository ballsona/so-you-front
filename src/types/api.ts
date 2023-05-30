export interface ApiError {
  code: number;
  errorMessage: string;
  errorInfo: unknown;
}

export type ApiResponse<T> = Promise<
  { isSuccess: true; result: T } | { isSuccess: false; result: ApiError }
>;
