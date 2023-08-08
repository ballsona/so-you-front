import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';

export const ModalWrapper = styled.div`
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
  left: calc(50% - 300px);
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
    text-align: center;
  }
`;

export const PopularityBarsWrap = styled.div`
  display: flex;
  gap: 8px;
`;
