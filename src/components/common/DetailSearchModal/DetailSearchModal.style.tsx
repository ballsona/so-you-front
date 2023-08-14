import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ModalWrapper = styled(motion.div)`
  width: 600px;
  height: 330px;
  background-color: ${COLORS.white};
  border-radius: 0px 0px 30px 30px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;

  position: absolute;
  top: 60px;
  left: calc(50% - 300px);
  z-index: 10;
`;

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const CategorysWrap = styled.div`
  width: 414px;

  .category {
    display: inline-block;
    margin: 6px;
    margin-top: 0px;
    cursor: pointer;
  }
`;

export const Field = styled.div`
  display: flex;

  .label {
    width: 79px;
    text-align: c;
  }
`;

export const PopularityBarsWrap = styled.div`
  display: flex;
  gap: 8px;
`;
