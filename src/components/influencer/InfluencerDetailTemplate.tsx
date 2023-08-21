import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';

import ArrowDownIcon from '@/assets/icon/arrow-down.svg';
import ArrowUpIcon from '@/assets/icon/arrow-up.svg';
import Image from 'next/image';

interface InfluencerDetailTemplateProps {
  data: any;
}

const InfluencerDetailTemplate = ({ data }: InfluencerDetailTemplateProps) => {
  const {
    channel_Image: image,
    channelTitle,
    followersCount,
    category,
    cost,
    subscriberCountIncrease,
    averageViews,
    averageViewsIncrease,
    videoCount,
    viewCount,
  } = data;
  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484}>
        인플루언서
      </Text>
      <DashBoard>
        <DataBoxWrap className="profile-data">
          <ProfileWrap>
            {image && (
              <Image
                src={image}
                width="60"
                height="60"
                className="channel-img"
              />
            )}
            <div>
              <Text
                size={16}
                weight="700"
                color={COLORS.gray484}
                className="channel-title"
              >
                {channelTitle}
              </Text>
              <Text size={14} color={COLORS.gray818}>
                {followersCount}명 구독
              </Text>
            </div>
          </ProfileWrap>
          <Text size={16} weight="700" color="#547AC3" className="category">
            {JSON.parse(category).join(', ')}
          </Text>
          <CostWrap>
            <Text size={16} weight="700" color={COLORS.gray484}>
              예상 단가
            </Text>
            <Text size={16} color={COLORS.gray484}>
              {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </Text>
          </CostWrap>
        </DataBoxWrap>

        <Text
          size={18}
          weight="700"
          color={COLORS.gray484}
          className="dashboard-title"
        >
          · 기본 데이터
        </Text>
        <BasicDataWrap>
          <DataBoxWrap className="data-box">
            <div>
              <Text size={16} color={COLORS.gray484} className="label">
                팔로워
              </Text>
              <Text size={24} weight="700" color={COLORS.gray484}>
                {followersCount}
              </Text>
            </div>
            <div>
              <div className="pct-wrap">
                <ArrowUpIcon />
                <div>
                  <Text size={14} weight="700" color="#59CE4F">
                    +{subscriberCountIncrease}%
                  </Text>
                  <Text size={10} color={COLORS.gray484}>
                    30일 기준
                  </Text>
                </div>
              </div>
            </div>
          </DataBoxWrap>

          <DataBoxWrap className="data-box">
            <div>
              <Text size={16} color={COLORS.gray484} className="label">
                평균 조회수
              </Text>
              <Text size={24} weight="700" color={COLORS.gray484}>
                {averageViews}
              </Text>
            </div>
            <div>
              <div className="pct-wrap">
                <ArrowDownIcon />
                <div>
                  <Text size={14} weight="700" color="#FE2222">
                    {averageViewsIncrease}%
                  </Text>
                  <Text size={10} color={COLORS.gray484}>
                    30일 기준
                  </Text>
                </div>
              </div>
            </div>
          </DataBoxWrap>

          <DataBoxWrap className="data-box">
            <div className="video-count">
              <Text size={16} color={COLORS.gray484} className="label">
                동영상 개수
              </Text>
              <Text size={24} weight="700" color={COLORS.gray484}>
                {videoCount}개
              </Text>
            </div>
          </DataBoxWrap>
        </BasicDataWrap>

        <Text
          size={18}
          weight="700"
          color={COLORS.gray484}
          className="dashboard-title"
        >
          · 데이터 통계
        </Text>
        <DataStatisticsWrap>
          <DataBoxWrap className="data-box">
            <Text size={16} color={COLORS.gray484}>
              팔로워
            </Text>
            <Text size={24} weight="700" color={COLORS.gray484}>
              {followersCount}
            </Text>
          </DataBoxWrap>
          <DataBoxWrap className="data-box">
            <Text size={16} color={COLORS.gray484}>
              조회수
            </Text>
            <Text size={24} weight="700" color={COLORS.gray484}>
              {viewCount}
            </Text>
          </DataBoxWrap>
          <DataBoxWrap className="data-box">
            <Text size={16} color={COLORS.gray484}>
              동영상 수
            </Text>
            <Text size={24} weight="700" color={COLORS.gray484}>
              {videoCount}
            </Text>
          </DataBoxWrap>
        </DataStatisticsWrap>
      </DashBoard>
    </TemplateWrapper>
  );
};

export default InfluencerDetailTemplate;

/** InfluencerDetailTemplate Style */

const TemplateWrapper = styled.div`
  height: 100vh;
  background-color: #fbfcff;
  padding-top: 108px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DashBoard = styled.div`
  width: 100%;
  margin: 30px auto 0px;
  padding: 0 100px;
  z-index: 10; // for bubble

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  .profile-data {
    width: 100%;
    height: 110px;
  }

  .dashboard-title {
    margin: 32px 0px 12px;
  }
`;

const DataBoxWrap = styled.div`
  background: ${COLORS.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  padding: 25px 31px;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;

  .channel-title {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .category {
    width: 33%;
    height: 100%;
    display: flex;
    align-items: center;
    border-right: 1px solid #e5e5e5;
    padding-left: 3%;

    min-width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .label {
    margin-bottom: 3px;
  }

  .pct-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .video-count {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const BasicDataWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .data-box {
    width: 32%;
    height: 150px;
  }
`;

const DataStatisticsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .data-box {
    width: 32%;
    height: 60px;
    padding: 9px 28px;

    justify-content: space-between;
    border-radius: 16px;
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 33%;
  border-right: 1px solid #e5e5e5;

  .channel-img {
    border-radius: 30px;
    background-color: #f6f6f6;
    border: 1px solid #cdcdcd;
  }
`;

const CostWrap = styled.div`
  width: 33%;
  padding-left: 5%;
`;
