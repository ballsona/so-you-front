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
