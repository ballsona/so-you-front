import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ApiError, ApiResponse } from '@/types/api';
import { getTokenAsync, setTokenInCookieAsync } from './auth';

const API_URL = 'https://www.soyoubackend.com';

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export function handleError(error: unknown): ApiError {
  // AxiosError로 타입 추론
  if (axios.isAxiosError(error)) {
    // 요청 성공, 응답 성공
    if (error.response) {
      return {
        code: error.response.status,
        errorMessage: error.response.data.err,
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
export async function putAsync<T, D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig<D>,
): ApiResponse<T> {
  try {
    const response = await API.put<T, AxiosResponse<T, D>, D>(url, data, {
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

// axios 요청 interceptor
API.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
  const { accessToken } = await getTokenAsync();

  if (accessToken && req.headers) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

// axios 응답 interceptor
API.interceptors.response.use(
  // 응답 정상
  (res: AxiosResponse) => res,
  // 응답 실패
  async (error) => {
    // 액세스 토큰이 유효하지 않을 경우
    if (error.response.status === 401) {
      try {
        const { accessToken, refreshToken } = await getTokenAsync();

        const res = await getAsync<any>('/api/user/refresh', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'x-refresh-token': refreshToken,
          },
        });

        if (res.isSuccess) {
          const { accessToken: aToken, refreshToken: rToken } =
            res.result.response;

          // 갱신된 토큰을 쿠키에 저장
          setTokenInCookieAsync(aToken, rToken);

          // 갱신된 토큰을 가지고 api 요청 재시도
          return axios.request({
            ...error.config,
            headers: {
              ...error.config?.headers,
              Authorization: `Bearer ${aToken}`,
            },
          });
        }
      } catch (err) {
        window.location.href = '/user/login';
      }
    }
    return Promise.reject(error);
  },
);
