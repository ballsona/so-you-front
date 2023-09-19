import { useModal } from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text from '../common/Text';
import ManagerModal from './ManagerModal';

const RegisterManager = ({ goNextStep }: any) => {
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    let tId;
    // eslint-disable-next-line prefer-const
    tId = setTimeout(() => {
      openModal(
        <ManagerModal
          onClickButton={() => {
            closeModal();
            goNextStep();
          }}
        />,
      );
    }, 2000);
  }, []);

  return (
    <Wrapper>
      <Image src="/process-loading.png" width="264" height="264" />
      <Text size={20} weight="600" color={COLORS.primary} className="title">
        담당자 배정이 진행중 입니다...
      </Text>
      <Text size={16} weight="300" color={COLORS.gray484}>
        배정 시간은 최대 하루 소요될 수 있습니다.
      </Text>
    </Wrapper>
  );
};

export default RegisterManager;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    margin-bottom: 10px;
  }
`;
