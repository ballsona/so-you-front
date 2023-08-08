import { COLORS } from '@/styles/theme';
import Text from '../Text';
import PopularityBar from './PopularityBar';
import {
  CostRangeType,
  PopularityDegreeType,
  ThemeType,
  popularityDegree,
  themes,
} from '@/constants/influencer';
import { useRecoilState } from 'recoil';
import { influencerSearchFilter } from '@/stores/influencerAtom';

import * as styles from './DetailSearchModal.style';
import CostRangeMenu from './CostRangeMenu';

const Label = ({ text }: { text: string }) => (
  <Text color={COLORS.primary} size={14} weight="400" className="label">
    {text}
  </Text>
);

const DetailSearchModal = () => {
  const [filter, setFilter] = useRecoilState(influencerSearchFilter);
  const { category, popularity, costRange } = filter;

  const onClickCategory = (theme: ThemeType) => {
    if (!category.includes(theme)) {
      setFilter((prev) => ({ ...prev, category: [...category, theme] }));
    } else {
      setFilter((prev) => ({
        ...prev,
        category: category.filter((t) => t !== theme),
      }));
    }
  };

  const onClickPopularityBar = (degree: PopularityDegreeType) => {
    setFilter((prev) => ({ ...prev, popularity: degree }));
  };

  const onSelectCostRange = (range: CostRangeType) => {
    setFilter((prev) => ({ ...prev, costRange: range }));
  };

  return (
    <styles.ModalWrapper>
      <styles.Field>
        <Label text="카테고리" />
        <styles.CategorysWrap>
          {themes.map((theme) => (
            <Text
              key={theme}
              size={14}
              weight={category.includes(theme) ? '700' : '400'}
              color={COLORS.gray484}
              className="category"
              onClick={() => onClickCategory(theme)}
            >
              {theme}
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
              onClick={() => onClickPopularityBar(d)}
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
