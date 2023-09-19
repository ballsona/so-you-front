import { ApiResponse } from '@/types/api';
import { CostRangeType, PopularityDegreeType } from '@/constants/influencer';
import { CategoryType } from '@/constants/category';
import { formatDate } from '@/utils/format';
import { postAsync } from '.';

export async function getMatchingInfluencerListAsync(requestForm: {
  popularity?: PopularityDegreeType;
  costRange?: CostRangeType;
  category?: CategoryType[];
}): ApiResponse<any> {
  const { popularity, costRange, category } = requestForm;
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
  const { popularity, costRange, category, dateRange } = requestForm;

  const renderDate = () => {
    if (dateRange.length > 0) {
      return `${formatDate(dateRange[0])} ~ ${formatDate(dateRange[1])}`;
    }
    return '';
  };
  const response = await postAsync('/api/user/project-request', {
    client_name: clientName,
    date: renderDate(),
    popularity,
    project_cost: costRange,
    influencer: influencerId,
    email: clientEmail,
    project_category: JSON.stringify(category),
  });
  return response;
}
