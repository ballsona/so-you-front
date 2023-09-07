import { ApiResponse } from '@/types/api';
import { postAsync } from '.';
import { CostRangeType, PopularityDegreeType } from '@/constants/influencer';
import { CategoryType } from '@/constants/category';

export async function getMatchingInfluencerListAsync(
  popularity?: PopularityDegreeType,
  costRange?: CostRangeType,
  category?: CategoryType[],
): ApiResponse<any> {
  const response = await postAsync('/api/matching/influencer', {
    categoryInput: category && category.length > 0 && JSON.stringify(category),
    costRangeInput: costRange,
    popularityInput: popularity,
  });
  return response;
}

// TODO refactor
export async function requestProjectAsync(
  requestForm: any,
  clientName: string,
  clientEmail: string,
  influencerId: number,
): ApiResponse<any> {
  const {
    popularity,
    costRange,
    category,
    dateRange: { startDate, endDate },
  } = requestForm;

  const response = await postAsync('/api/user/project-request', {
    client_name: clientName,
    date: `[${startDate},${endDate}]` ?? '',
    popularity,
    project_cost: costRange,
    influencer: influencerId,
    email: clientEmail,
    project_category: JSON.stringify(category),
  });
  return response;
}
