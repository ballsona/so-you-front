import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Text from '../common/Text';
import { useState } from 'react';

const ButtonTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

const LABELS = ['매칭 신청', '매칭 진행중', '매칭 종료'];
const LEFTS = [0, 200, 400];

const ToggleButton = ({ activeItem, setActiveItem }: any) => {
  const handleSwitch = (id: number) => {
    setActiveItem(id + 1);
  };
  return (
    <ButtonWrapper>
      <Switch layout transition={ButtonTransition} left={LEFTS[activeItem]} />
      {LABELS.map((label, idx) => (
        <Text
          key={label}
          size={14}
          weight="400"
          color={activeItem === idx ? COLORS.white : COLORS.primary}
          onClick={() => handleSwitch(idx)}
          className="item"
        >
          {label}
        </Text>
      ))}
    </ButtonWrapper>
  );
};

export default ToggleButton;

const ButtonWrapper = styled.div`
  width: 600px;
  height: 38px;
  border: 1px solid ${COLORS.primary};
  border-radius: 90px;

  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 15px;

  .item {
    width: 200px;
    height: 36px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Switch = styled(motion.div)`
  width: 200px;
  height: 36px;
  border-radius: 90px;
  background-color: ${COLORS.primary};

  z-index: -1;
  position: absolute;
  top: 0;
  left: ${(props: { left: number }) => props.left}px;
`;
