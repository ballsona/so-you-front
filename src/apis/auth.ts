import { UserType } from '@/types/user';
import axios, { AxiosInstance } from 'axios';

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://www.soyoueatsyours.com/api';

const NEXT_API: AxiosInstance = axios.create({
  baseURL: URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 토큰을 쿠키에 저장하는 함수
export const setTokenInCookieAsync = async (
  accessToken: string,
  refreshToken: string,
) => {
  const response = await NEXT_API.post('/auth/token', {
    accessToken,
    refreshToken,
  });
  return response.status;
};

// 토큰 값을 쿠키에서 가져오는 함수
export const getTokenAsync = async () => {
  const response = await NEXT_API.get('/auth/token');
  const { data } = response.data;
  return data;
};

// 쿠키에서 토큰을 제거하는 함수
export const removeTokenAsync = async () => {
  const response = await NEXT_API.delete('/auth/token');
  return response.status;
};

// 토큰을 유저 정보를 저장하는 함수
export const setUserTypeAsync = async (userType: UserType) => {
  const response = await NEXT_API.post('/auth/user', {
    userType,
  });
  return response.status;
};

// 유저 정보를 쿠키에서 가져오는 함수
export const getUserTypeAsync = async () => {
  const response = await NEXT_API.get('/auth/user');
  const { data } = response.data;
  return data;
};

// 쿠키에서 유저 정보를 제거하는 함수
export const removeUserTypeAsync = async () => {
  const response = await NEXT_API.delete('/auth/user');
  return response.status;
};
