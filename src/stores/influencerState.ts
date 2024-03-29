import {
  InfluencerDataType,
  InfluencerSearchFilterType,
  uInfluencerDataType,
} from '@/types/influencer';
import { atom } from 'recoil';

/** 모달에서 보여지는 인플루언서 상세 데이터 */
export const focusedInfluencerData = atom<InfluencerDataType | null>({
  key: 'influencerData',
  default: null,
});

/** 검색 키워드 */
export const searchKeyWord = atom<string>({
  key: 'searchKeyWord',
  default: '',
});

/** 상세 검색에 사용되는 필터 */
export const searchFilter = atom<InfluencerSearchFilterType>({
  key: 'searchFilter',
  default: {
    category: [],
  },
});

/** 검색 결과 데이터 */
export const searchResult = atom<uInfluencerDataType[]>({
  key: 'searchResult',
  default: [],
});
