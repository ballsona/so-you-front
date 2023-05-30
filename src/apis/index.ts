import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError, ApiResponse } from '@/types/api';

const API_URL = 'https://www.soyoubackend.com'; // TODO 백엔드에서 URL 받을 것!

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

function handleError(error: unknown): ApiError {
  // AxiosError로 타입 추론
  if (axios.isAxiosError(error)) {
    // 요청 성공, 응답 성공
    if (error.response) {
      return {
        code: error.response.status,
        errorMessage: '문제가 발생했어요. 다시 시도해주세요.',
        errorInfo: error.response.data,
      };
    }
    // 요청 성공, 응답 실패
    if (error.request) {
      return {
        code: -1,
        errorMessage:
          '서버와 연결하지 못했어요. 인터넷 연결 상태를 확인해주세요',
        errorInfo: error.request.data,
      };
    }
  }

  return {
    code: -1,
    errorMessage: '문제가 발생했어요. 다시 시도해주세요.',
    errorInfo: error,
  };
}

export async function getAsync<T>(
  url: string,
  config?: AxiosRequestConfig,
): ApiResponse<T> {
  try {
    const response = await API.get<T, AxiosResponse<T, any>, any>(url, {
      ...config,
    });
    return {
      isSuccess: true,
      result: response.data,
    };
  } catch (error) {
    return {
      isSuccess: false,
      result: handleError(error),
    };
  }
}

export async function postAsync<T, D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig<D>,
): ApiResponse<T> {
  try {
    const response = await API.post<T, AxiosResponse<T, D>, D>(url, data, {
      ...config,
    });
    return {
      isSuccess: true,
      result: response.data,
    };
  } catch (error) {
    return {
      isSuccess: false,
      result: handleError(error),
    };
  }
}
