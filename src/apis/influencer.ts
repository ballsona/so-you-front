import { ApiResponse } from '@/types/api';
import { getAsync } from '.';
import { uInfluencerDataType } from '@/types/influencer';

// TODO 타입

/** 인플루언서 목록 불러오기 */
export async function getInfluencerListAsync(token: string): ApiResponse<any> {
  const response = await getAsync<any>('/api/influencer/list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
