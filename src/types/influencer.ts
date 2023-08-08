import {
  CostRangeType,
  PopularityDegreeType,
  ThemeType,
} from '@/constants/influencer';

{
}
export interface uInfluencerDataType {
  /** idx */
  index: number;
  /** 유튜브 채널 이미지 */
  channel_image: string;
  /** 유튜브 채널 이름 */
  channel_title: string;
  /** 유튜브 채널 링크  */
  youtube_link: string;
  /** 팔로워 수   */
  followersCount: number;
  /** 카테고리  */
  category: string;
  /** 인지도  */
  popularity: number;
  /** 조회수  */
  view_count: number;
  /** 비용  */
  cost: number;
}

export interface InfluencerDataType {
  /**  인플루언서 고유 아이디 (계정 아이디 X) */
  influencer_id: number;
  /** 인플루언서 순위 */
  ranking: number;
  /** 인플루언서 이름 */
  name: string;
  /** 소요 기간 (일 단위) */
  working_time: number;
  /** 구독자 수 */
  followersCount: number;
  /** 관련 카테고리 배열 */
  category: Array<ThemeType>;
  /** 예상 비용 */
  cost: number;
  /** 채널 링크 (유투브) */
  youtube_link?: string;
}

export interface InfluencerDetailDataType extends InfluencerDataType {
  /** 조회수 평균 */
  average_views: number;
  /** 조회수 합계 */
  total_views: number;
  /** 팔로워 변동 퍼센트 (30일 기준) */
  followers_change_pct: number;
  /** 조회수 평균 변동 퍼센트 (30일 기준)*/
  average_views_change_pct: number;
  /** 동영상 개수 */
  video_count: number;
}

export interface InfluencerSearchType {
  /** 상세 검색 여부 */
  isDetailMode: boolean;
  /** 검색 키워드 */
  keyword: string;
}

export interface InfluencerSearchFilterType {
  /** 관련 카테고리 배열 */
  category: Array<ThemeType>;
  /** 인지도 (1~5) */
  popularity: PopularityDegreeType;
  /** 예산 범위 */
  costRange: CostRangeType;
}
