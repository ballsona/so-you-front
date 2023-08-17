import { modalStateAtom } from '@/stores/modalState';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

export function useModal() {
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const openModal = (content: ReactNode, overlay?: boolean) => {
    setModalState({
      visible: true,
      content,
      overlay: overlay ?? false,
    });
  };

  const closeModal = () => {
    setModalState({
      visible: false,
      content: null,
    });
  };

  return { openModal, closeModal, modalState };
}
