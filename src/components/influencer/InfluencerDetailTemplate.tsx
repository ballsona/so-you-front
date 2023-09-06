import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';

import ArrowDownIcon from '@/assets/icon/arrow-down.svg';
import ArrowUpIcon from '@/assets/icon/arrow-up.svg';
import Image from 'next/image';
import { formatCountVal } from '@/utils/format';

interface InfluencerDetailTemplateProps {
  data: any;
}

const IndexLabels = [
  {
    label: '최우수',
    color: '#6290E9',
    min: 700,
  },
  { label: '우수', color: '#40BA16', min: 450 },
  {
    label: '양호',
    color: '#F19100',
    min: 250,
  },
  {
    label: '미흡',
    color: '#FF5520',
    min: 90,
  },
  {
    label: '저조',
    color: '#D92626',
    min: 0,
  },
];

function calculateScore(
  averageViews: number,
  videoCount: number,
  followersCount: number,
) {
  return (averageViews * videoCount) / followersCount;
}

function renderScoreTxt(score: number) {
  for (let i = 0; i < IndexLabels.length; i++) {
    if (score > IndexLabels[i].min) {
      return [IndexLabels[i].label, IndexLabels[i].color];
    }
  }
  return [IndexLabels[0].label, IndexLabels[0].color];
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

  const soyouScore = calculateScore(averageViews, videoCount, followersCount);
  const [soyouScoreTxt, soyouScoreColor] = renderScoreTxt(soyouScore);
  const soYouScorePinLoc = soyouScore > 700 ? 1 : 100 - (soyouScore / 700) * 95;

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
                {formatCountVal(followersCount)}명 구독
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
              {formatCountVal(cost)}원
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
                {formatCountVal(followersCount)}
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
                {formatCountVal(averageViews)}
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
                {formatCountVal(videoCount)}개
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
          · 채널 품질
        </Text>
        <BasicDataWrap className="soyou-data">
          <SoYouDataBoxWrap>
            <Text
              size={16}
              color={COLORS.gray484}
              className="soyou-score-label"
            >
              SoYou Score
            </Text>
            <div className="soyou-score-txt">
              <Text size={32} weight="700" color={COLORS.gray484}>
                {parseInt(soyouScore.toString())}점
              </Text>
              <Text
                size={24}
                weight="700"
                color={soyouScoreColor}
                className="score-txt"
              >
                {soyouScoreTxt}
              </Text>
            </div>
            <Hr />
            <Text
              size={11}
              weight="400"
              color="#8e8e8e"
              className="data-description"
            >
              Soyou Score은 인플루언서가 양질의 콘텐츠를 생산하는 지 채널을
              판단하는 점수로 AI에 의한 데이터 분석을 통해 총 5가지 등급으로
              분류 됩니다.
            </Text>
          </SoYouDataBoxWrap>
          <SoYouDataBoxWrap className="soyou-index-box">
            <div className="soyou-index-label">
              <Text size={16} color={COLORS.gray484}>
                SoYou 지표
              </Text>
              <Text size={11} weight="400" color="#8e8e8e">
                Soyou Score 지표에 따라 인플루언서가 어느 등급 쪽에 가까운지
                표시 됩니다.
              </Text>
            </div>
            <div className="soyou-index-data">
              <IndexPin
                src={'/IndexPin.png'}
                left={parseInt(soYouScorePinLoc.toString())}
              />
              <IndexHr />
              <IndexLabelWrap>
                {IndexLabels.map((idx: any) => (
                  <Text
                    size={20}
                    weight="300"
                    color={idx.color}
                    key={idx.label}
                  >
                    {idx.label}
                  </Text>
                ))}
              </IndexLabelWrap>
            </div>
          </SoYouDataBoxWrap>
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
              {formatCountVal(followersCount)}
            </Text>
          </DataBoxWrap>
          <DataBoxWrap className="data-box">
            <Text size={16} color={COLORS.gray484}>
              조회수
            </Text>
            <Text size={24} weight="700" color={COLORS.gray484}>
              {formatCountVal(viewCount)}
            </Text>
          </DataBoxWrap>
          <DataBoxWrap className="data-box">
            <Text size={16} color={COLORS.gray484}>
              동영상 수
            </Text>
            <Text size={24} weight="700" color={COLORS.gray484}>
              {formatCountVal(videoCount)}
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
  background-color: #fbfcff;

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

  .soyou-data {
    justify-content: flex-start;
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
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: relative;

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
  gap: 20px;

  .data-box {
    width: 32%;
    height: 150px;
  }

  .soyou-index-box {
    width: 100%;
    height: 180px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0;
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

export const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin: 5px 0px;
`;

export const IndexHr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
`;

export const SoYouDataBoxWrap = styled.div`
  background: ${COLORS.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  padding: 25px 25px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 540px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;

  .soyou-index-data {
    width: 95%;
    position: absolute;
    bottom: 10px;
  }

  .data-description {
    line-height: 14px;
  }

  .soyou-score-label {
    margin-bottom: 30px;
  }

  .soyou-score-txt {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .soyou-index-label {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
  }
`;

export const IndexLabelWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;

export const IndexPin = styled.img`
  position: absolute;
  bottom: 40px;
  left: ${(props: { left: number }) => props.left}%;
`;
