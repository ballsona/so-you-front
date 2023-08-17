// TODO must edit type
export const NAV_INFO: Record<string, any> = {
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
  login: {
    text: '로그인',
    url: '/user/login',
  },
  id_find: {
    text: '아이디 찾기',
    url: '/user/find-account',
  },
  pw_find: {
    text: '비밀번호 찾기',
    url: '/user/find-password',
  },
  register: {
    text: '회원가입',
    url: '/user/register',
  },
};

export type NavInfoKey = keyof typeof NAV_INFO;
