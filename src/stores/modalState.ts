import React, { ReactNode } from 'react';
import { atom } from 'recoil';

interface ModalState {
  visible: boolean;
  content?: ReactNode;
  overlay?: boolean;
}

export const modalStateAtom = atom<ModalState>({
  key: 'modalStateAtom',
  default: {
    visible: false,
  },
});
