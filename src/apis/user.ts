import {
  LoginInputType,
  LoginOutputType,
  RegisterFormType,
  RegisterOutputType,
} from '@/types/user';
import { getAsync, postAsync } from '.';
import { ApiResponse } from '@/types/api';
import { userType } from '@/types/user';
import { CategoryType } from '@/constants/category';

/** 로그인 요청 함수 */
export async function loginAsync(
  email: string,
  password: string,
): ApiResponse<LoginOutputType> {
  const response = await postAsync<LoginOutputType, LoginInputType>('/login', {
    email,
    password,
  });
  return response;
}

/** 회원가입 요청 함수 (유저 타입에 따라 body가 달라짐을 주의) */
export async function registerAsync(
  type: userType,
  email: string,
  password: string,
  name: string,
  birth_date: string,
  youtube_link?: string,
  cost?: number,
  category?: Array<CategoryType>,
): ApiResponse<RegisterOutputType> {
  const default_data = { type, email, password, name, birth_date };
  const influencer_data = {
    youtube_link,
    cost,
    category: JSON.stringify(category),
  };

  const response = await postAsync<
    RegisterOutputType,
    Omit<RegisterFormType, 'emailVerifyCode'>
  >(
    '/register',
    type === 'client' ? default_data : { ...default_data, ...influencer_data },
  );
  return response;
}

/** 이메일 인증 요청 함수 */
export async function verifyEmailAsync(email: string): ApiResponse<unknown> {
  const response = await postAsync<unknown, { email: string }>('/send', {
    email,
  });
  return response;
}

/** 이메일 인증코드 검증 요청 함수 */
export async function verifyEmailCodeAsync(
  email: string,
  code: string,
): ApiResponse<unknown> {
  const response = await postAsync<unknown, { email: string; code: string }>(
    '/verify',
    {
      email,
      code,
    },
  );
  return response;
}

// TODO type
/** 유저 정보 요청하는 함수 */
export async function getUserInfoAsync(token: string): ApiResponse<any> {
  const response = await getAsync<any>('/api/user/mypage', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
