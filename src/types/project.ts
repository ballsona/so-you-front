import {
  CostRangeType,
  PopularityDegreeType,
  SeasonType,
  ThemeType,
} from '@/constants/influencer';

export interface ProjectRequestDataType {
  /**  광고주 이름 (server: client_name) */
  clientName?: string;
  /** 광고주 이메일 (server: email) */
  clientEmail?: string;
  /** 선택된 인플루언서 아이디 (server: influencer) */
  influencerId?: number | null;
  /** 기간 (server: date)  */
  season: SeasonType | null;
  /** 인지도 */
  popularity: PopularityDegreeType | null;
  /** 예산 (server: project_cost)  */
  costRange: CostRangeType | null;
  /** 카테고리 (server: project_category)  */
  category: ThemeType[];
}
