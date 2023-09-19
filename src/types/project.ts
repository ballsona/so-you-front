import { CategoryType } from '@/constants/category';
import { CostRangeType, PopularityDegreeType } from '@/constants/influencer';

export interface RequestFormType {
  /** 기간 (server: date)  */
  dateRange?: [Date, Date];
  /** 인지도 */
  popularity?: PopularityDegreeType;
  /** 예산 (server: project_cost)  */
  costRange?: CostRangeType;
  /** 카테고리 (server: project_category)  */
  category?: CategoryType[];
}

export interface ProjectRequestDataType extends RequestFormType {
  /**  광고주 이름 (server: client_name) */
  clientName?: string;
  /** 광고주 이메일 (server: email) */
  clientEmail?: string;
  /** 선택된 인플루언서 아이디 (server: influencer) */
  influencerId?: number;
}
