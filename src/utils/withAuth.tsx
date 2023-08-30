import { getTokenAsync, getUserTypeAsync, removeTokenAsync } from '@/apis/auth';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const AUTH_URL = [
  '/user/login',
  '/user/register',
  '/user/register/client',
  '/user/register/influencer',
];

export function withAuth(getServerSideProps: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { cookies } = context.req;
    const { accessToken, refreshToken, userType } = cookies;

    //const { accessToken, refreshToken } = await getTokenAsync();
    //const { userType } = await getUserTypeAsync();

    const url = context.resolvedUrl;

    // 토큰 없으면 로그인 창으로 이동
    if ((!accessToken || !refreshToken) && !AUTH_URL.includes(url)) {
      return {
        redirect: {
          destination: '/user/login',
          statusCode: 302,
        },
      };
    }

    // 로그인 되어있는 상태에서 페이지 접근 막기
    //if (AUTH_URL.includes(url) && accessToken && refreshToken) {
    //  return {
    //    redirect: {
    //      destination: '/influencer',
    //      statusCode: 302,
    //    },
    //  };
    //}

    // 로그인 상태에서 로그인/회원가입 페이지 접근 막기
    //if (accessToken && refreshToken && url === '/user/login') {
    //  return {
    //    redirect: {
    //      destination: '/influencer',
    //      statusCode: 302,
    //    },
    //  };
    //}

    // 유저 타입이 없으면 로그인 실패했다고 간주 후 로그인 창으로 이동
    //if (!userType) {
    //  await removeTokenAsync();
    //  return {
    //    redirect: {
    //      destination: '/user/login',
    //      statusCode: 302,
    //    },
    //  };
    //}

    // 관리자가 아닌 유저가 Admin 페이지 접근 시 메인 페이지로 이동
    if (userType !== 'manager' && url === '/admin') {
      return {
        redirect: {
          destination: '/',
          statusCode: 302,
        },
      };
    }

    return await getServerSideProps(context);
  };
}
