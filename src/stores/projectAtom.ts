import { ProjectRequestDataType } from '@/types/project';
import { atom } from 'recoil';

export const projectRequestStep = atom({
  key: 'projectRequestStep',
  default: 0,
});

export const projectRequestData = atom<ProjectRequestDataType | null>({
  key: 'projectRequestData',
  default: null,
});
