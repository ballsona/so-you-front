import { postAsync } from '.';
import { ApiResponse } from '@/types/api';
import { uInfluencerDataType } from '@/types/influencer';
import { CostRangeType, PopularityDegreeType } from '@/constants/influencer';
import { CategoryType } from '@/constants/category';

// 토큰 빼기
/** 인플루언서 검색 */
export async function searchInfluencerAsync /** 관련 카테고리 배열 */(
  keyword: string,
  category: CategoryType[],
  popularity?: PopularityDegreeType,
  costRange?: CostRangeType,
): ApiResponse<uInfluencerDataType> {
  const response = await postAsync<uInfluencerDataType, any>(
    '/api/search/influencer',
    {
      categoryInput: category.length > 0 ? JSON.stringify(category) : undefined,
      costRangeInput: costRange,
      popularityInput: popularity,
      searchKeyword: keyword,
    },
  );
  return response;
}
