import { EmailVerifyStatusType, userType } from '@/types/user';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'user-data',
});

export const userTypeAtom = atom<userType>({
  key: 'userTypeAtom',
  //default: null,
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
