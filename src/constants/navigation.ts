export type NavType =
  | 'influencer'
  | 'register'
  | 'project'
  | 'report'
  | 'mypage'
  | 'id_find'
  | 'pw_find'
  | 'login'
  | 'admin';

export const NAV_INFO: Record<NavType, { label: string; url: string }> = {
  project: {
    label: '프로젝트',
    url: '/project/request',
  },
  influencer: {
    label: '인플루언서',
    url: '/influencer',
  },
  report: {
    label: '리포트',
    url: '/report',
  },
  mypage: {
    label: '마이페이지',
    url: '/mypage',
  },
  admin: {
    label: '관리자',
    url: '/admin',
  },
  login: {
    label: '로그인',
    url: '/user/login',
  },
  id_find: {
    label: '아이디 찾기',
    url: '/user/find-account',
  },
  pw_find: {
    label: '비밀번호 찾기',
    url: '/user/find-password',
  },
  register: {
    label: '회원가입',
    url: '/user/register',
  },
};
