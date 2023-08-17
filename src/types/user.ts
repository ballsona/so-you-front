import { CategoryType } from '@/constants/category';

export type userType = 'influencer' | 'client';

export interface LoginFormType {
  email: string;
  password: string;
}

export interface LoginOutputType {
  success: boolean;
  email: string;
  type: string;
  token: string;
  refreshToken: string;
}

export interface RegisterFormType {
  type: userType;
  email: string;
  emailVerifyCode: string;
  password: string;
  passwordCheck?: string;
  name: string;
  birth_date: string;
  youtube_link?: string;
  cost?: number;
  category?: CategoryType[];
}

export interface RegisterOutputType {
  success: boolean;
}

/**
 *  1: 이메일 입력받는 중
 *  2: 이메일 인증 요청 후 코드 기다리는 중
 *  3: 코드 확인 후 검증 완료
 * */
export type EmailVerifyStatusType = 1 | 2 | 3;

export interface MyPageFormType {
  email: string;
  password: string;
  name: string;
  birth_date: string;
  youtube_link?: string;
  channel_id?: string;
  cost?: number;
  category?: CategoryType[];
}
