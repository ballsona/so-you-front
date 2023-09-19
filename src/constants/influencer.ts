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

// export const popularities = [
//  '50만 초과',
//  '10만 초과 50만 이하',
//  '1만 초과 10만 이하',
//  '5천 초과 1만 이하',
//  '5천 이하',
// ] as const;
// export type PopularityType = (typeof popularities)[number];

export const popularityDegree = [5, 4, 3, 2, 1] as const;
export type PopularityDegreeType = (typeof popularityDegree)[number];
