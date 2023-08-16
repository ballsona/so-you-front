import CategorySelectModal from '@/components/common/CategorySelectModal';
import CategoryTag from '@/components/common/CategoryTag';
import CostRangeMenu from '@/components/common/CostRangeMenu';
import PopularityBar from '@/components/common/DetailSearchModal/PopularityBar';
import InputField from '@/components/common/InputField';
import Text from '@/components/common/Text';
import {
  CostRangeType,
  PopularityDegreeType,
  SeasonType,
  CategoryType,
  popularityDegree,
  seasons,
} from '@/constants/influencer';
import { projectRequestData, projectRequestStep } from '@/stores/projectState';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const RequestForm = () => {
  const router = useRouter();
  const [, setActiveStep] = useRecoilState(projectRequestStep);
  const [, setRequestData] = useRecoilState(projectRequestData);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [category, setCategory] = useState<Array<CategoryType>>([]);
  const [popularity, setPopularity] = useState<PopularityDegreeType | null>(
    null,
  );
  const [season, setSeason] = useState<SeasonType | null>(null);
  const [costRange, setCostRange] = useState<CostRangeType>('5,000,000원 이하');

  const handleModal = () => setIsModalOpened((prev) => !prev);

  const onClickCategory = (theme: CategoryType) => {
    if (!category.includes(theme) && category.length >= 5) {
      alert('카테고리는 5개 이하로 선택해주세요');
    } else if (!category.includes(theme) && category.length < 5) {
      setCategory((prev) => [...prev, theme]);
    } else {
      setCategory((prev) => prev.filter((t) => t !== theme));
    }
  };

  const onClickPopularityBar = (degree: PopularityDegreeType) => {
    setPopularity(degree);
  };

  const onSelectCostRange = (range: CostRangeType) => {
    setCostRange(range);
  };

  const onSubmitForm = () => {
    setActiveStep((prev) => prev + 1);
    setRequestData((prev) => ({
      ...prev,
      category,
      popularity,
      season,
      costRange,
    }));
  };

  return (
    <Wrapper>
      {isModalOpened && (
        <ModalContainer>
          <CategorySelectModal
            category={category}
            handleModal={handleModal}
            onClickCategory={onClickCategory}
          />
        </ModalContainer>
      )}
      <InputField label="카테고리">
        {category.map((c) => (
          <CategoryTag key={c} theme={c} />
        ))}
        <CategoryButton onClick={handleModal}>추가</CategoryButton>
      </InputField>
      <InputField label="인 지 도">
        <PopularityBarsWrap>
          {popularityDegree.map((d) => (
            <PopularityBar
              isFocused={d === popularity}
              degree={d}
              onClick={() => onClickPopularityBar(d)}
            />
          ))}
        </PopularityBarsWrap>
      </InputField>
      <InputField label="기    간">
        <SeasonsWrap>
          {seasons.map((s) => (
            <Text
              key={s}
              size={14}
              weight={s === season ? '700' : '400'}
              color={s === season ? COLORS.primary : COLORS.gray484}
              onClick={() => setSeason(s)}
              className="season-menu"
            >
              {s}
            </Text>
          ))}
        </SeasonsWrap>
      </InputField>
      <InputField label="예    산">
        <CostRangeMenu
          selectedMenu={costRange}
          setSelectedMenu={onSelectCostRange}
        />
      </InputField>
      <ButtonsWrap>
        <Button onClick={() => router.back()} className="cancel-btn">
          뒤로
        </Button>
        <Button onClick={onSubmitForm} className="update-btn">
          의뢰하기
        </Button>
      </ButtonsWrap>
    </Wrapper>
  );
};

export default RequestForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CategoryButton = styled.button`
  width: 60px;
  height: 32px;
  border-radius: 40px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
`;

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 25;
  position: absolute;
  top: 0;
  left: 0;
`;

const PopularityBarsWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const SeasonsWrap = styled.div`
  display: flex;
  gap: 10px;

  .season-menu {
    cursor: pointer;
  }
`;

const ButtonsWrap = styled.div`
  margin: 50px auto 0px;
  display: flex;

  .cancel-btn {
    background-color: ${COLORS.grayC4C};
    width: 100px;
    margin-right: 5px;
  }

  .update-btn {
    background-color: ${COLORS.primary};
    width: 160px;
  }
`;

const Button = styled.button`
  height: 36px;
  color: ${COLORS.white};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
`;
