import {
  LoginInputType,
  LoginOutputType,
  RegisterInputType,
  RegisterOutputType,
} from '@/types/user';
import { postAsync } from '.';
import { ApiResponse } from '@/types/api';
import { userType } from '@/types/user';
import { ThemeType } from '@/constants/influencer';

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

export async function registerAsync(
  type: userType,
  email: string,
  password: string,
  name: string,
  birth_date: string,
  channel?: string,
  cost?: number,
  category?: ThemeType[],
): ApiResponse<RegisterOutputType> {
  const default_data = { type, email, password, name, birth_date };
  const influencer_data = { channel, cost, category };

  const response = await postAsync<RegisterOutputType, RegisterInputType>(
    '/register',
    type === 'client' ? default_data : { ...default_data, ...influencer_data },
  );
  return response;
}
