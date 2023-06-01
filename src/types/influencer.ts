import { ThemeType } from '@/constants/influencer';

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
