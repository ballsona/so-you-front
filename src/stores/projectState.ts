import { ProjectRequestDataType } from '@/types/project';
import { atom } from 'recoil';

export const projectRequestStep = atom({
  key: 'projectRequestStep',
  default: 0,
});

export const projectRequestData = atom<ProjectRequestDataType>({
  key: 'projectRequestData',
  default: {
    clientName: '',
    clientEmail: '',
    influencerId: null,
    season: null,
    popularity: null,
    costRange: null,
    category: [],
  },
});
