import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';

import CloseIcon from '@/assets/icon/close.svg';
import Text from './Text';
import { themes } from '@/constants/influencer';

const CategorySelectModal = () => (
  <ModalWrapper>
    <CloseIcon className="close-icon" />
    <Text size={20} weight="700" color={COLORS.gray484} className="title">
      카테고리 추가
    </Text>
    <Text size={12} weight="400" color={COLORS.grayB5B} className="title">
      내게 맞는 테마를 1개 이상 선택해주세요.
    </Text>
    <Hr />
    <CategorysWrap>
      {themes.map((theme) => (
        <Category key={theme}>{theme}</Category>
      ))}
    </CategorysWrap>
    <ModalButtonsWrap>
      <Button className="cancel-btn">취소</Button>
      <Button className="add-btn">추가</Button>
    </ModalButtonsWrap>
  </ModalWrapper>
);

export default CategorySelectModal;

/** CategorySelectModal Style */

const ModalWrapper = styled.div`
  width: 360px;
  height: 370px;
  background-color: ${COLORS.white};
  box-shadow: 0px 0px 5px rgba(136, 136, 136, 0.23);
  border-radius: 8px;
  padding: 38px 30px 0px;
  overflow: hidden;
  position: relative;

  .close-icon {
    position: absolute;
    top: 15px;
    right: 20px;
  }

  .title {
    margin-bottom: 10px;
  }
`;

const Hr = styled.div`
  height: 1px;
  width: 300px;
  background-color: ${COLORS.primary};
`;

const CategorysWrap = styled.div`
  width: 300px;
  margin-top: 22px;
`;

const Category = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  margin: 6px;
  color: ${COLORS.gray484};
  cursor: pointer;
`;

const ModalButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;

  .cancel-btn {
    width: 140px;
    background-color: ${COLORS.grayB5B};
  }

  .add-btn {
    width: 220px;
    background-color: ${COLORS.primary};
  }
`;

const Button = styled.button`
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  color: ${COLORS.white};
`;
