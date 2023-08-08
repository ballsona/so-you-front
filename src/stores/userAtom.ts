import { EmailVerifyStatusType } from '@/types/user';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tokenAtom = atom({
  key: 'token',
  default: {
    token: null,
    refreshToken: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userDataAtom = atom({
  key: 'userData',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const emailVerifyStatusAtom = atom<EmailVerifyStatusType>({
  key: 'emailVerifyStatusState',
  default: 1,
});

export const emailVerifyCodeAtom = atom<string>({
  key: 'emailVerifyCodeState',
  default: '',
});
