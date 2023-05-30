export const NAV_INFO = {
  project: {
    label: '프로젝트',
    url: '/project',
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
} as const;

export type NavInfoKeys = keyof typeof NAV_INFO;
