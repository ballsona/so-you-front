export const themes = [
  '일상/Vlog',
  '뷰티',
  '엔터테이먼트/BJ',
  '먹방',
  '요리/쿠킹',
  '패션',
  '게임',
  '여행/아웃도어',
  'IT/전자기기',
  '교육',
  '스포츠',
  '펫/애완동물',
  '키즈/놀이',
  '창업',
  '영화/드라마',
  '홈/리빙',
  'ASMR',
  '커플',
  '자기개발',
  '음악',
  '댄스',
  '뉴스',
  '기업/기관',
  'DIY/만들기',
  '역사/교양',
  '외국어/언어',
  '자동차/바이크',
  '예술/아트',
  '부동산',
  '과학기술',
  '운세/타로',
  '트랜드',
] as const;
export type ThemeType = (typeof themes)[number];

export const seasons = ['봄', '여름', '가을', '겨울'] as const;
export type SeasonType = (typeof seasons)[number];

export const costRanges = [
  '5,000,000원 이하',
  '5,000,000원 ~ 10,000,000원',
  '10,000,000원 ~ 50,000,000원',
  '50,000,000원 ~ 100,000,000원',
  '100,000,000원 이상',
] as const;
export type CostRangeType = (typeof costRanges)[number];

//export const popularities = [
//  '50만 초과',
//  '10만 초과 50만 이하',
//  '1만 초과 10만 이하',
//  '5천 초과 1만 이하',
//  '5천 이하',
//] as const;
//export type PopularityType = (typeof popularities)[number];

export const popularityDegree = [5, 4, 3, 2, 1] as const;
export type PopularityDegreeType = (typeof popularityDegree)[number];
