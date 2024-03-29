import {
  LoginFormType,
  LoginOutputType,
  RegisterFormType,
  RegisterOutputType,
  UserType,
} from '@/types/user';
import { ApiResponse } from '@/types/api';
import { CategoryType } from '@/constants/category';
import { getAsync, postAsync, putAsync } from '.';

/** 로그인 요청 함수 */
export async function loginAsync(
  email: string,
  password: string,
): ApiResponse<LoginOutputType> {
  const response = await postAsync<LoginOutputType, LoginFormType>('/login', {
    email,
    password,
  });
  return response;
}

/** 회원가입 요청 함수 (유저 타입에 따라 body가 달라짐을 주의) */
export async function registerAsync(
  type: UserType,
  email: string,
  password: string,
  name: string,
  birth_date: string,
  youtube_link?: string,
  cost?: number,
  category?: Array<CategoryType>,
  channel_id?: string,
): ApiResponse<RegisterOutputType> {
  const default_data = { type, email, password, name, birth_date };
  const influencer_data = {
    youtube_link,
    cost,
    category: JSON.stringify(category),
    channel_id,
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

export async function verifyChannelIdAsync(id: string): ApiResponse<unknown> {
  const response = await postAsync('/api/getChannelId', {
    channelId: id,
  });
  return response;
}

/** 유저 정보 요청하는 함수 */
export async function getUserInfoAsync(): ApiResponse<any> {
  const response = await getAsync<any>('/api/user/mypage');
  return response;
}

interface UpdateForm {
  category: string;
  birth_date: string;
  cost: string;
  youtube_link: string;
}

/** 유저 정보 업데이트하는 함수 */
export async function updateUserInfoAsync(
  fields: UpdateForm,
): ApiResponse<any> {
  const response = await putAsync('/api/influencer/mypage', fields);
  return response;
}

/** 유저 비밀번호 업데이트하는 함수 */
export async function updatePasswordAsync(
  name: string,
  birth_date: string,
  password: string,
): ApiResponse<any> {
  const response = await putAsync('/api/user/mypage/pw', {
    name,
    birth_date,
    password,
  });
  return response;
}
