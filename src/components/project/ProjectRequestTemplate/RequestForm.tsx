import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { CostRangeType, popularityDegree } from '@/constants/influencer';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { categoryListAtom } from '@/stores/categoryState';
import { useModal } from '@/hooks/useModal';
import CategorySelectModal from '@/components/common/Modal/CategorySelectModal';
import CategoryTag from '@/components/common/CategoryTag';
import CostRangeMenu from '@/components/common/CostRangeMenu';
import PopularityBar from '@/components/common/PopularityBar';
import Text from '@/components/common/Text';
import { CategoryType } from '@/constants/category';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { RequestFormType } from '@/types/project';

import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';

const formatDate = (date: Date) =>
  `${date.getFullYear()}월 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const RequestForm = ({
  onSubmit,
}: {
  onSubmit: (formFields: RequestFormType) => Promise<void>;
}) => {
  const router = useRouter();
  const { openModal } = useModal();

  const [calendarState, setCalendarState] = useState<'start' | 'end'>();

  const handleCalendarState = (newState: 'start' | 'end') => {
    if (!calendarState) {
      setCalendarState(newState);
    } else {
      setCalendarState(undefined);
    }
  };

  const category = useRecoilValue<CategoryType[]>(categoryListAtom);
  const formMethods = useForm<Omit<RequestFormType, 'category'>>({
    defaultValues: {
      dateRange: { startDate: undefined, endDate: undefined },
    },
  });

  const { setValue, control, handleSubmit } = formMethods;
  const { popularity, dateRange, costRange } = useWatch({ control });

  const onSelectCostRange = (range: CostRangeType) => {
    setValue('costRange', range);
  };

  const onSelectStartDate = (value: any, e: any) => {
    if (dateRange?.endDate && value.getTime() >= dateRange?.endDate.getTime()) {
      alert('시작 날짜는 종료일 이전의 날짜를 선택해주세요!');
      return;
    }
    setValue('dateRange.startDate', value ?? undefined);
    setCalendarState(undefined);
  };

  const onSelectEndDate = (value: any, e: any) => {
    if (
      dateRange?.startDate &&
      value.getTime() <= dateRange?.startDate.getTime()
    ) {
      alert('종료 날짜는 시작일 이후의 날짜를 선택해주세요!');
      return;
    }
    setValue('dateRange.endDate', value ?? undefined);
    setCalendarState(undefined);
  };

  const requestProject = () => {
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
              onClick={() => openModal(<CategorySelectModal />, true, '')}
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
            <DateInputWrapper>
              <Text size={13} weight="500" color="#262627">
                시작 일자
              </Text>
              <DateInput onClick={() => handleCalendarState('start')}>
                {dateRange?.startDate
                  ? formatDate(dateRange.startDate)
                  : '날짜 선택'}
              </DateInput>
              {calendarState === 'start' && (
                <Calendar onChange={onSelectStartDate} className="calendar" />
              )}
            </DateInputWrapper>
            <DateInputWrapper>
              <Text size={13} weight="500" color="#262627">
                종료 일자
              </Text>
              <DateInput onClick={() => handleCalendarState('end')}>
                {dateRange?.endDate
                  ? formatDate(dateRange.endDate)
                  : '날짜 선택'}
              </DateInput>
              {calendarState === 'end' && (
                <Calendar onChange={onSelectEndDate} className="calendar" />
              )}
            </DateInputWrapper>
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

export default RequestForm;

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

const DateInputWrapper = styled.div`
  .calendar {
    position: absolute;
    z-index: 10;
    width: 300px;
  }
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
