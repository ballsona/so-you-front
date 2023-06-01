export interface ApiError {
  /** 에러 코드 */
  code: number;
  /** 서버에서 전달하는 에러 메세지 */
  errorMessage: string;
  /** 에러 관련 정보 (서버에서 받아오는 것 X) */
  errorInfo?: unknown;
}

export type ApiResponse<T> = Promise<
  { isSuccess: true; result: T } | { isSuccess: false; result: ApiError }
>;
