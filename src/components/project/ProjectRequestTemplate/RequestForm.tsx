import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import {
  CostRangeType,
  popularityDegree,
  seasons,
} from '@/constants/influencer';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { categoryListAtom } from '@/stores/categoryState';
import { useModal } from '@/hooks/useModal';

import CategorySelectModal from '@/components/common/Modal/CategorySelectModal';
import CategoryTag from '@/components/common/CategoryTag';
import CostRangeMenu from '@/components/common/CostRangeMenu';
import PopularityBar from '@/components/common/PopularityBar';
import InputField from '@/components/common/InputField';
import Text from '@/components/common/Text';
import { CategoryType } from '@/constants/category';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { RequestFormType } from '@/types/project';

const RequestForm = ({
  onSubmit,
}: {
  onSubmit: (formFields: RequestFormType) => Promise<void>;
}) => {
  const router = useRouter();
  const { openModal } = useModal();

  const category = useRecoilValue<CategoryType[]>(categoryListAtom);
  const formMethods = useForm<Omit<RequestFormType, 'category'>>();

  const { setValue, control, handleSubmit } = formMethods;
  const { popularity, season, costRange } = useWatch({ control });

  const onSelectCostRange = (range: CostRangeType) => {
    setValue('costRange', range);
  };

  const requestProject = () => {
    onSubmit({ popularity, season, costRange, category });
  };

  return (
    <FormProvider {...formMethods}>
      <Wrapper>
        <InputField label="카테고리" className="category-row">
          {category.map((c) => (
            <CategoryTag key={c} theme={c} />
          ))}
          <CategoryButton
            onClick={() => openModal(<CategorySelectModal />, true, '')}
          >
            추가
          </CategoryButton>
        </InputField>
        <InputField label="인 지 도">
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
        </InputField>
        <InputField label="기    간">
          <SeasonsWrap>
            {seasons.map((s) => (
              <Text
                key={s}
                size={14}
                weight={s === season ? '700' : '400'}
                color={s === season ? COLORS.primary : COLORS.gray484}
                onClick={() => setValue('season', s)}
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
  align-items: flex-start;
  width: 450px;

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
