import { useModal } from '@/hooks/useModal';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

const ModalProvider = () => {
  const { modalState, closeModal } = useModal();

  const { visible, content, overlay } = modalState;

  if (visible) {
    const modalRoot = window ? document.getElementById('modal') : null;
    return modalRoot && content
      ? createPortal(
          <Wrapper>
            {content}
            <ModalOverlay onClick={closeModal} overlay={overlay} />
          </Wrapper>,
          modalRoot,
        )
      : null;
  }
  return null;
};

export default ModalProvider;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props: { overlay?: boolean }) =>
    props.overlay ? 'rgba(0, 0, 0, 0.50)' : 'transparent'};
  z-index: -1;
`;
