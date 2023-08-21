import { modalStateAtom } from '@/stores/modalState';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

export function useModal() {
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const openModal = (content: ReactNode, name?: string, overlay?: boolean) => {
    setModalState({
      visible: true,
      content,
      name,
      overlay: overlay ?? false,
    });
  };

  const closeModal = () => {
    setModalState({
      visible: false,
      content: null,
      name: '',
    });
  };

  return { openModal, closeModal, modalState };
}
