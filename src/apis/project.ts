import { ApiResponse } from '@/types/api';
import { getAsync, postAsync } from '.';
import {
  CostRangeType,
  PopularityDegreeType,
  CategoryType,
} from '@/constants/influencer';

export async function getMatchingInfluencerListAsync(
  token: string,
  popularity: PopularityDegreeType | null,
  costRange: CostRangeType | null,
  category: CategoryType[],
): ApiResponse<any> {
  const response = await postAsync(
    '/api/matching/influencer',
    {
      categoryInput: JSON.stringify(category),
      costRangeInput: costRange,
      popularityInput: popularity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
}
