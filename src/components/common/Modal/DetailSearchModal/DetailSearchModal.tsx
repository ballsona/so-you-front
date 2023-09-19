import { COLORS } from '@/styles/theme';
import Text from '@/components/common/Text';
import PopularityBar from '@/components/common/PopularityBar';
import CostRangeMenu from '@/components/common/CostRangeMenu';
import { CategoryType, categories } from '@/constants/category';
import {
  CostRangeType,
  PopularityDegreeType,
  popularityDegree,
} from '@/constants/influencer';
import { useRecoilState } from 'recoil';
import { searchFilter } from '@/stores/influencerState';

import { useModal } from '@/hooks/useModal';
import * as styles from './DetailSearchModal.style';

const Label = ({ text }: { text: string }) => (
  <Text color={COLORS.primary} size={14} weight="400" className="label">
    {text}
  </Text>
);

const DetailSearchModal = () => {
  const { modalState } = useModal();

  const [filter, setFilter] = useRecoilState(searchFilter);
  const { category: selectedCategory, popularity, costRange } = filter;

  const onClickCategory = (c: CategoryType) => {
    if (!selectedCategory.includes(c)) {
      setFilter((prev: any) => ({
        ...prev,
        category: [...selectedCategory, c],
      }));
    } else {
      setFilter((prev: any) => ({
        ...prev,
        category: selectedCategory.filter((s) => s !== c),
      }));
    }
  };

  const onSelectPopularity = (degree: PopularityDegreeType) => {
    setFilter((prev) => ({ ...prev, popularity: degree }));
  };

  const onSelectCostRange = (range: CostRangeType) => {
    setFilter((prev) => ({ ...prev, costRange: range }));
  };

  return (
    <styles.ModalWrapper
      animate={modalState.visible ? 'open' : 'closed'}
      initial={{ y: -30 }}
      variants={{
        open: { y: 0 },
        closed: { opacity: 0 },
      }}
    >
      <styles.Field>
        <Label text="카테고리" />
        <styles.CategorysWrap>
          {categories.map((category: any) => (
            <Text
              key={category}
              size={14}
              weight={selectedCategory.includes(category) ? '700' : '400'}
              color={COLORS.gray484}
              className="category"
              onClick={() => onClickCategory(category)}
            >
              {category}
            </Text>
          ))}
        </styles.CategorysWrap>
      </styles.Field>
      <styles.Field>
        <Label text="인 지 도" />
        <styles.PopularityBarsWrap>
          {popularityDegree.map((d) => (
            <PopularityBar
              isFocused={d === popularity}
              degree={d}
              onClick={() => onSelectPopularity(d)}
            />
          ))}
        </styles.PopularityBarsWrap>
      </styles.Field>
      <styles.Field>
        <Label text="예   산" />
        <CostRangeMenu
          selectedMenu={costRange}
          setSelectedMenu={onSelectCostRange}
        />
      </styles.Field>
    </styles.ModalWrapper>
  );
};

export default DetailSearchModal;
