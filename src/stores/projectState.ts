import { getUserInfoAsync } from '@/apis/user';
import { RequestFormType } from '@/types/project';
import { atom, selector } from 'recoil';

export const projectRequestForm = atom<RequestFormType>({
  key: 'projectRequestForm',
  default: {
    season: undefined,
    popularity: undefined,
    costRange: undefined,
    category: undefined,
  },
});

export const projectRequestData = selector({
  key: 'projectRequestData',
  get: async ({ get }) => {
    const formFields = get(projectRequestForm);
    const res = await getUserInfoAsync();
    if (res.isSuccess) {
      const { name, email } = res.result.user;

      return {
        ...formFields,
        name,
        email,
      };
    }
  },
});
