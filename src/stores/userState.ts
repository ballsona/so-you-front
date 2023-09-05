import { EmailVerifyStatusType } from '@/types/user';
import { atom } from 'recoil';

export const emailVerifyStatusAtom = atom<EmailVerifyStatusType>({
  key: 'emailVerifyStatusState',
  default: 1,
});

export const emailVerifyCodeAtom = atom<string>({
  key: 'emailVerifyCodeState',
  default: '',
});
