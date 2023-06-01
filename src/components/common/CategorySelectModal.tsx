import styled from '@emotion/styled';
import Text from './Text';

import CloseIcon from '@/assets/icon/close.svg';

import { ThemeType, themes } from '@/constants/influencer';
import { COLORS } from '@/styles/theme';

interface CategorySelectModalProps {
  category: ThemeType[];
  handleModal: () => void;
  onClickCategory: (theme: ThemeType) => void;
}

const CategorySelectModal = ({
  category,
  handleModal,
  onClickCategory,
}: CategorySelectModalProps) => (
  <ModalWrapper>
    <CloseIcon className="close-icon" onClick={handleModal} />
    <Text size={20} weight="700" color={COLORS.gray484} className="title">
      카테고리 추가
    </Text>
    <Text size={12} color={COLORS.grayB5B} className="title">
      내게 맞는 테마를 1개 이상 선택해주세요.
    </Text>
    <Hr />
    <CategorysWrap>
      {themes.map((theme) => (
        <Category
          key={theme}
          onClick={() => onClickCategory(theme)}
          selected={category.includes(theme)}
        >
          {theme}
        </Category>
      ))}
    </CategorysWrap>
    <ModalButtonsWrap>
      <Button className="cancel-btn" onClick={handleModal}>
        취소
      </Button>
      <Button className="add-btn" onClick={handleModal}>
        추가
      </Button>
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
  top: calc(50% - 180px);
  left: calc(50% - 185px);

  .close-icon {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
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
  color: ${({ selected }: { selected: boolean }) =>
    selected ? COLORS.primary : COLORS.gray484};
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
