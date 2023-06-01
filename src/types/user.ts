import { ThemeType } from '@/constants/influencer';

export type userType = 'influencer' | 'client';

export interface LoginInputType {
  email: string;
  password: string;
}

export interface LoginOutputType {
  token: string;
}

export interface RegisterInputType {
  type: userType;
  email: string;
  password: string;
  passwordCheck?: string;
  name: string;
  birth_date: string;
  channel?: string;
  cost?: number;
  category?: ThemeType[];
}

export interface RegisterOutputType {
  success: true;
}

/**
 *  1: 이메일 입력받는 중
 *  2: 이메일 인증 요청 후 코드 기다리는 중
 *  3: 코드 확인 후 검증 완료
 * */
export type EmailVerifyStatusType = 1 | 2 | 3;
