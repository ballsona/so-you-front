import { ApiResponse } from '@/types/api';
import { getAsync } from '.';

/** 인플루언서 목록 불러오기 */
export async function getInfluencerListAsync(): ApiResponse<any> {
  const response = await getAsync<any>('/api/influencer/list');
  return response;
}

/** 인플루언서 상세 데이터 불러오기 */
export async function getInfluencerDetailInfoAsync(
  index: number,
): ApiResponse<any> {
  const response = await getAsync<any>(`/api/influencer/list/${index}`);
  return response;
}

/** 인플루언서 통계 데이터 불러오기 */
export async function getStatisticsInfoAsync(index: number): ApiResponse<any> {
  const response = await getAsync<any>(`/api/getInfluencer/info/${index}`);
  return response;
}
