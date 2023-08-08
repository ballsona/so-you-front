import {
  InfluencerDataType,
  InfluencerSearchFilterType,
} from '@/types/influencer';
import { atom } from 'recoil';

/** 모달로 띄울 인플루언서 데이터 */
export const focusedInfluencerData = atom<InfluencerDataType | null>({
  key: 'influencerData',
  default: null,
});

/** 검색 키워드 */
export const searchKeyWord = atom<string>({
  key: 'SearchKeyWord',
  default: '',
});

/** 상세 검색 여부 */
export const detailSearchMode = atom<boolean>({
  key: 'deatailSearchMode',
  default: false,
});

/** 상세 검색에 사용되는 필터 */
export const influencerSearchFilter = atom<InfluencerSearchFilterType>({
  key: 'influencerSearchFilter',
  default: {
    category: [],
    popularity: 5,
    costRange: '5,000,000원 ~ 10,000,000원',
  },
});
