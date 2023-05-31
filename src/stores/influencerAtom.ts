import { InfluencerDataType } from '@/types/influencer';
import { atom } from 'recoil';

export const influencerInfoState = atom<InfluencerDataType | null>({
  key: 'influencerInfoState',
  default: null,
});
