import { ApiResponse } from '@/types/api';
import { uInfluencerDataType } from '@/types/influencer';
import { postAsync } from '.';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  influencerSearchFilter,
  searchKeyWord,
} from '@/stores/influencerState';
import {
  CostRangeType,
  PopularityDegreeType,
  CategoryType,
} from '@/constants/influencer';

// TODO 전역 상태 제거
// 토큰 빼기
/** 인플루언서 검색 */
export async function searchInfluencerAsync /** 관련 카테고리 배열 */(
  keyword: string,
  category: Array<CategoryType>,
  popularity: PopularityDegreeType,
  costRange: CostRangeType,
  token: string,
): ApiResponse<uInfluencerDataType> {
  const response = await postAsync<uInfluencerDataType, any>(
    '/api/search/influencer',
    {
      categoryInput: JSON.stringify(category),
      costRangeInput: costRange,
      popularityInput: popularity,
      searchKeyword: keyword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
}
