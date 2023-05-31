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
