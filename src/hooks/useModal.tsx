import { modalStateAtom } from '@/stores/modalState';
import { ReactNode, useCallback } from 'react';
import { useRecoilState } from 'recoil';

export function useModal() {
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  /**
   * @param content Modal Component
   * @param overlay 모달 열려있을 때 배경색 여부(opt)
   * @param name 모달 이름(opt)
   */
  const openModal = useCallback(
    (content: ReactNode, overlay?: boolean, name?: string) => {
      setModalState({
        visible: true,
        content,
        name,
        overlay: overlay ?? false,
      });
    },
    [setModalState],
  );

  const closeModal = useCallback(() => {
    setModalState({
      visible: false,
      content: null,
      name: '',
    });
  }, [setModalState]);

  return { openModal, closeModal, modalState };
}
