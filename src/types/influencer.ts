import { ThemeType } from '@/constants/influencer';

export interface InfluencerDataType {
  influencer_id: number;
  ranking: number;
  name: string;
  subscribeCount: number;
  category: Array<ThemeType>;
  cost: number;
}
