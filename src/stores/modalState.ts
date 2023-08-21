import React, { ReactNode } from 'react';
import { atom } from 'recoil';

interface ModalState {
  visible: boolean;
  name?: string;
  content?: ReactNode;
  overlay?: boolean;
}

export const modalStateAtom = atom<ModalState>({
  key: 'modalStateAtom',
  default: {
    visible: false,
  },
});
