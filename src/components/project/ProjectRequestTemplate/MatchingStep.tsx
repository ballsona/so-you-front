import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { CostRangeType, popularityDegree } from '@/constants/influencer';
import { COLORS } from '@/styles/theme';
import { categoryListAtom } from '@/stores/categoryState';
import { useModal } from '@/hooks/useModal';
import CategorySelectModal from '@/components/common/Modal/CategorySelectModal';
import CategoryTag from '@/components/common/CategoryTag';
import CostRangeMenu from '@/components/common/CostRangeMenu';
import PopularityBar from '@/components/common/PopularityBar';
import Text from '@/components/common/Text';
import styled from '@emotion/styled';
import { CategoryType } from '@/constants/category';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { RequestFormType } from '@/types/project';
import DateRangeModal from '@/components/common/Modal/DateRangeModal';
import { formatDate } from '@/utils/format';

const MatchingStep = ({
  onSubmit,
}: {
  onSubmit: (fields: RequestFormType) => Promise<void>;
}) => {
  const router = useRouter();
  const { openModal } = useModal();

  const category = useRecoilValue<CategoryType[]>(categoryListAtom);

  const formMethods = useForm<Omit<RequestFormType, 'category'>>({
    defaultValues: {
      dateRange: [],
    },
  });
  const { setValue, control, handleSubmit } = formMethods;
  const { popularity, costRange, dateRange } = useWatch({ control });

  const onSelectCostRange = (range: CostRangeType) => {
    setValue('costRange', range);
  };

  const onSelectDateRange = (range: [Date, Date]) => {
    setValue('dateRange', range);
  };

  const requestProject = () => {
    if (!category.length) {
      alert('카테고리를 선택해주세요');
      return;
    }

    if (!popularity) {
      alert('인지도를 선택해주세요');
      return;
    }

    if (!dateRange || !dateRange.length) {
      alert('기간을 설정해주세요');
      return;
    }

    if (!costRange) {
      alert('예산을 선택해주세요');
      return;
    }

    onSubmit({ popularity, dateRange, costRange, category });
  };

  return (
    <FormProvider {...formMethods}>
      <Wrapper>
        <InputWrapper>
          <InputBox>
            <Text size={16} weight="700" color="#262627">
              카테고리
            </Text>
            <CategoryButton
              onClick={() =>
                openModal(<CategorySelectModal maxCount={1} />, true, '')
              }
            >
              추가
            </CategoryButton>
            <CategoryTagsWrap>
              {category.map((c) => (
                <CategoryTag key={c} theme={c} />
              ))}
            </CategoryTagsWrap>
          </InputBox>
          <InputBox>
            <Text size={16} weight="700" color="#262627">
              인 지 도
            </Text>
            <PopularityBarsWrap>
              {popularityDegree.map((d) => (
                <PopularityBar
                  key={d}
                  degree={d}
                  isFocused={d === popularity}
                  onClick={() => setValue('popularity', d)}
                />
              ))}
            </PopularityBarsWrap>
          </InputBox>
          <InputBox>
            <Text size={16} weight="700" color="#262627">
              기 간
            </Text>
            <OpenCalendarButton
              onClick={() =>
                openModal(<DateRangeModal setDateRange={onSelectDateRange} />)
              }
            >
              날짜 선택
            </OpenCalendarButton>
            <div>
              <Text size={13} weight="500" color="#262627">
                시작일
              </Text>
              <DateInput>
                {dateRange?.[0]
                  ? formatDate(dateRange?.[0])
                  : '날짜를 선택해주세요'}
              </DateInput>
              <Text size={13} weight="500" color="#262627">
                종료일
              </Text>
              <DateInput>
                {dateRange?.[1]
                  ? formatDate(dateRange?.[1])
                  : '날짜를 선택해주세요'}
              </DateInput>
            </div>
          </InputBox>
          <InputBox>
            <Text size={16} weight="700" color="#262627">
              예 산
            </Text>
            <CostRangeMenu
              selectedMenu={costRange}
              setSelectedMenu={onSelectCostRange}
              className="cost-menu"
            />
          </InputBox>
        </InputWrapper>
        <ButtonsWrap>
          <Button onClick={() => router.back()} className="cancel-btn">
            뒤로
          </Button>
          <Button onClick={handleSubmit(requestProject)} className="update-btn">
            의뢰하기
          </Button>
        </ButtonsWrap>
      </Wrapper>
    </FormProvider>
  );
};

export default MatchingStep;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;

  .category-row {
    width: 1000px;
  }
`;

const CategoryButton = styled.button`
  width: 60px;
  height: 32px;
  border-radius: 40px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
`;

const OpenCalendarButton = styled.button`
  width: 80px;
  height: 32px;
  border-radius: 40px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  margin-bottom: -5px;
`;

const PopularityBarsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonsWrap = styled.div`
  margin: 50px auto 0px;
  display: flex;

  .cancel-btn {
    background-color: ${COLORS.grayC4C};
    width: 90px;
    margin-right: 5px;
  }

  .update-btn {
    background-color: ${COLORS.primary};
    width: 135px;
  }
`;

const Button = styled.button`
  height: 42px;
  color: ${COLORS.white};
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
`;

const InputBox = styled.div`
  width: 190px;
  height: 280px;
  background-color: ${COLORS.white};
  box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-top: 25px;
  position: relative;

  .cost-menu {
    width: 170px;
  }
`;

const CategoryTagsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const DateInput = styled.div`
  width: 160px;
  height: 30px;
  border-radius: 6px;
  background-color: #eff1f9;
  color: #5a5a5b;

  font-size: 13px;
  font-weight: 400;
  line-height: 30px;
  padding-left: 5px;
  margin: 5px 0px 10px;
`;
