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
const LEFTS = [0, 240, 480];
const SWICH_RADIUS = ['20px 0px 0px 0px', '0px', '0px 20px 0px 0px'];

const ToggleButton = ({ activeItem, setActiveItem }: any) => {
  const handleSwitch = (id: number) => {
    setActiveItem(id + 1);
  };
  return (
    <ButtonWrapper>
      <Switch
        layout
        transition={ButtonTransition}
        left={LEFTS[activeItem]}
        borderRadius={SWICH_RADIUS[activeItem]}
      />
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
  width: 100%;
  height: 50px;
  border: 1px solid ${COLORS.primary};
  border-radius: 20px 20px 0px 0px;

  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  .item {
    width: 240px;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface SwitchProps {
  left: number;
  borderRadius: string;
}

const Switch = styled(motion.div)`
  width: 240px;
  height: 100%;
  border-radius: ${(props: SwitchProps) => props.borderRadius};
  background-color: ${COLORS.primary};

  z-index: -1;
  position: absolute;
  top: 0;
  left: ${(props: SwitchProps) => props.left}px;
`;
