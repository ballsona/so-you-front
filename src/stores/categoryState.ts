import { atom } from 'recoil';
import { CategoryType } from '@/constants/category';

/** 현재 선택된 카테고리 목록 Atom */
export const categoryListAtom = atom<CategoryType[]>({
  key: 'categoryList',
  default: [],
});
