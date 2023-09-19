import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';

import CloseIcon from '@/assets/icon/close.svg';

import { COLORS } from '@/styles/theme';
import { CategoryType, categories } from '@/constants/category';
import { useRecoilState } from 'recoil';
import { categoryListAtom } from '@/stores/categoryState';
import { useModal } from '@/hooks/useModal';
import Text from '../Text';

const CategoryItem = React.memo(
  ({
    label,
    isSelected,
    onClickItem,
  }: {
    label: CategoryType;
    isSelected: boolean;
    onClickItem: (c: CategoryType) => void;
  }) => (
    <Text
      size={12}
      weight="700"
      color={isSelected ? COLORS.primary : COLORS.gray484}
      className="category"
      onClick={() => onClickItem(label)}
    >
      {label}
    </Text>
  ),
);

const CategorySelectModal = () => {
  const { closeModal } = useModal();

  // 최종적으로 선택된 카테고리 목록
  const [selectedCategories, setSelectedCategories] =
    useRecoilState(categoryListAtom);

  // 현재 모달창에서 선택한 카테고리 목록
  const [tempSelectedList, setTempSelectedList] =
    useState<CategoryType[]>(selectedCategories);

  const onClickCategory = useCallback(
    (c: CategoryType) => {
      if (!tempSelectedList.includes(c) && tempSelectedList.length >= 5) {
        alert('카테고리는 5개 이하로 선택해주세요');
      } else if (!tempSelectedList.includes(c) && tempSelectedList.length < 5) {
        setTempSelectedList((prev) => [...prev, c]);
      } else {
        setTempSelectedList((prev) => prev.filter((t) => t !== c));
      }
    },
    [tempSelectedList],
  );

  const onSubmitModal = () => {
    setSelectedCategories(tempSelectedList);
    closeModal();
  };

  return (
    <ModalWrapper>
      <CloseIcon className="close-icon" onClick={closeModal} />
      <Text
        size={20}
        weight="700"
        color={COLORS.gray484}
        className="modal-title"
      >
        카테고리 추가
      </Text>
      <Text size={12} color={COLORS.grayB5B} className="modal-title">
        내게 맞는 테마를 1개 이상 선택해주세요.
      </Text>
      <Hr />
      <CategorysWrap>
        {categories.map((category) => (
          <CategoryItem
            key={category}
            label={category}
            isSelected={tempSelectedList.includes(category)}
            onClickItem={() => onClickCategory(category)}
          />
        ))}
      </CategorysWrap>
      <ModalButtonsWrap>
        <Button className="cancel-btn" onClick={closeModal}>
          취소
        </Button>
        <Button className="add-btn" onClick={onSubmitModal}>
          추가
        </Button>
      </ModalButtonsWrap>
    </ModalWrapper>
  );
};

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

  .modal-title {
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

  .category {
    display: inline-block;
    margin: 6px;
    cursor: pointer;
  }
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
