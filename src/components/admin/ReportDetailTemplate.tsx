import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';

import VideoPlayIcon from '@/assets/icon/video-play.svg';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('./Chart'), {
  ssr: false,
});

interface ReportTemplateProps {
  data: any;
}

export const sData: any = [
  {
    id: 1,
    report_title: '유튜버 히밥 피자집 마케팅',
    report_name: '먹방 담당자 (1)',
    report_content:
      '부천 피자 음식점 “Y”와 유튜버 히밥 마케팅 매칭 리포트 입니다.\n예산 : 50,00,000원\n매칭 및 미팅 일정 조율 : 2023.06.19. ~ 2023.06.23.\n마케팅 금액 조율 완료\n송출 일정 : 2023.07.28. ~ 2023.08.04.\n예상 조회수 200,000',
    date: '2023.06.19 ~ 2023.06.23',
    cost: '5,000,000',

    link: 'https://www.youtube.com/watch?v=SNTxRbJ9wYg',
    view_count: '290,000',
    subscribe_count: '1,520,000',
    sy_ratio: '19.07',
    sy_score: '3.0',
    sy_text: '기간 동안 준수한 조회수 증가 및 SY 비율 양호로 목표 달성',
    graph_data: [
      { date: '07.28', count: '30000' },
      { date: '07.29', count: '40000' },
      { date: '07.30', count: '90000' },
      { date: '07.31', count: '150000' },
      { date: '08.01', count: '200000' },
      { date: '08.02', count: '230000' },
      { date: '08.03', count: '260000' },
      { date: '08.04', count: '290000' },
    ],
    domain: [30000, 290000],
  },
  {
    id: 2,
    report_title: '유튜버 히밥 중국집 마케팅',
    report_name: '먹방 담당자 (1)',
    date: '2023.07.13 ~ 2023.07.20',
    cost: '6,000,000',
    report_content:
      '분당 중식집 “W”와 유튜버 히밥 마케팅 매칭 리포트 입니다.\n예산 : 60,00,000원\n매칭 및 미팅 일정 조율 : 2023.07.13. ~ 2023.07.20.\n마케팅 금액 조율 완료\n송출 일정 : 2023.08.11. ~ 2023.08.17.\n예상 조회수 350,000',
    link: 'https://www.youtube.com/watch?v=3O1V1QsyjEM&t=497s',
    view_count: '305,000',
    subscribe_count: '1,520,000',
    sy_ratio: '23.02',
    sy_score: '4.0',
    sy_text: '기간 동안 폭발적인 조회수 증가 및 SY 비율 우수로 종합 지표 우수',
    graph_data: [
      { date: '08.13', count: '5000' },
      { date: '08.14', count: '30000' },
      { date: '08.15', count: '70000' },
      { date: '08.16', count: '120000' },
      { date: '08.17', count: '160000' },
      { date: '08.18', count: '190000' },
      { date: '08.19', count: '230000' },
    ],
    domain: [5000, 230000],
  },
  {
    id: 3,
    report_title: '유튜버 히밥 양념대창, 주먹밥 마케팅',
    report_name: '먹방 담당자 (1)',
    date: '2023.07.24 ~ 2023.07.28',
    cost: '3,000,000',
    report_content:
      '유튜버 히밥 양념대창 주먹밥 협찬 마케팅 매칭 리포트 입니다.\n예산 : 30,00,000원\n매칭 및 미팅 일정 조율 : 2023.07.24. ~ 2023.07.28.\n마케팅 금액 조율 완료\n송출 일정 : 2023.08.13. ~ 2023.08.19.\n예상 조회수 250,000',
    link: 'https://www.youtube.com/watch?v=cRk6iYYyw6s',
    view_count: '230,000',
    subscribe_count: '1,520,000',
    sy_ratio: '15.13',
    sy_score: '2.5',
    sy_text: '조회수 달성 미흡이나, SY 비율로는 양호한 상태 종합 지표 2.5',
    graph_data: [
      { date: '08.11', count: '60000' },
      { date: '08.12', count: '100000' },
      { date: '08.13', count: '170000' },
      { date: '08.14', count: '200000' },
      { date: '08.15', count: '230000' },
      { date: '08.16', count: '300000' },
      { date: '08.17', count: '350000' },
    ],
    domain: [60000, 350000],
  },
];

const ReportTemplate = ({ data }: ReportTemplateProps) => {
  const router = useRouter();
  const id = Number(router.query.id as string);

  const {
    report_title,
    report_name, // 작성자
    report_content,
    date,
    cost,
    link,
    view_count,
    subscribe_count,
    sy_ratio,
    sy_score,
    sy_text,
    graph_data,
    domain,
  } = data;

  // const youtubeId = link.split('?')[1]?.split('&')[0]?.split('=')[1];
  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        리포트 관리
      </Text>
      <DashBoard>
        <BasicDataWrap>
          {/* {youtubeId ? (
            <Youtube
              videoId={youtubeId}
              opts={{
                width: 350,
                height: 200,
              }}
            />
          ) : (
            <DataBoxWrap className="empty-video">영상이 없습니다</DataBoxWrap>
          )} */}

          <VideoBox onClick={() => router.push(link)}>
            <img src={`/VideoImage${id}.jpg`} alt="video-img" />
            <VideoPlayIcon className="icon" />
          </VideoBox>
          <DataBoxWrap className="content-box">
            <TextWrap>
              <Text size={14} weight="700" color={COLORS.gray484}>
                제목
              </Text>
              <Text size={14} weight="400" color={COLORS.gray484}>
                {report_title}
              </Text>
            </TextWrap>
            <TextWrap>
              <Text size={14} weight="700" color={COLORS.gray484}>
                작성자
              </Text>
              <Text size={14} weight="400" color={COLORS.gray484}>
                {report_name}
              </Text>
            </TextWrap>
            <TextWrap className="content">
              <Text size={14} weight="700" color={COLORS.gray484}>
                내용
              </Text>
              <Text
                size={14}
                weight="400"
                color={COLORS.gray484}
                className="content-txt"
              >
                {report_content}
              </Text>
            </TextWrap>
          </DataBoxWrap>
        </BasicDataWrap>

        <Text
          size={18}
          weight="700"
          color={COLORS.gray484}
          className="basic-title"
        >
          · 기본 데이터
        </Text>
        <BasicDataWrap>
          <DataBoxWrap className="data-box">
            <div>
              <Text size={16} color={COLORS.gray484} className="label">
                조회수
              </Text>
              <Text size={32} weight="700" color={COLORS.gray484}>
                {view_count}
              </Text>
            </div>
            <Hr />
            <Text
              size={12}
              weight="400"
              color="#8e8e8e"
              className="data-description"
            >
              마케팅 종료 시점의 조회수 입니다.
            </Text>
            <Text
              size={20}
              weight="400"
              color={id === 3 ? '#F27400' : '#6290E9'}
              className="score-txt"
            >
              {id === 3 ? '미흡' : '달성'}
            </Text>
          </DataBoxWrap>

          <DataBoxWrap className="data-box">
            <div>
              <Text size={16} color={COLORS.gray484} className="label">
                구독자
              </Text>
              <Text size={32} weight="700" color={COLORS.gray484}>
                {subscribe_count}
              </Text>
            </div>
            <Hr />
            <Text
              size={12}
              weight="400"
              color="#8e8e8e"
              className="data-description"
            >
              유튜버의 구독자 수 등급 분류 입니다.
            </Text>
            <Text size={20} weight="400" color="#6290E9" className="score-txt">
              최우수
            </Text>
          </DataBoxWrap>

          <DataBoxWrap className="data-box">
            <div className="video-count">
              <Text size={16} color={COLORS.gray484} className="label">
                SY 비율
              </Text>
              <Text size={32} weight="700" color={COLORS.gray484}>
                {sy_ratio}%
              </Text>
            </div>
            <Hr />
            <Text
              size={12}
              weight="400"
              color="#8e8e8e"
              className="data-description"
            >
              조회수 대비 구독자 비율로서, 해당 인플루언서를 통해 마케팅이
              얼마나 효율적이였는지를 나타내는 지표 입니다.
            </Text>
            <Text
              size={20}
              weight="400"
              color={id === 2 ? '#6290E9' : '#F19100'}
              className="score-txt"
            >
              {id === 2 ? '우수' : '양호'}
            </Text>
          </DataBoxWrap>
        </BasicDataWrap>

        <Text
          size={18}
          weight="700"
          color={COLORS.gray484}
          className="basic-title"
        >
          · SY 지표
        </Text>
        <SYDataWrap>
          <DataBoxWrap className="sy-score-box">
            <Text size={25} weight="400" color={COLORS.gray484}>
              <span className="sy-score">{sy_score}</span> / 5.0
            </Text>
            <img src={`/Stars${id}.png`} alt="star-img" />
          </DataBoxWrap>
          <DataBoxWrap className="sy-text-box">
            <Text size={16} weight="400" color={COLORS.gray484}>
              {sy_text}
            </Text>
          </DataBoxWrap>
        </SYDataWrap>

        <Text
          size={18}
          weight="700"
          color={COLORS.gray484}
          className="view-title"
        >
          · 영상 조회수
        </Text>
        <DataBoxWrap className="chart">
          <DynamicChart data={graph_data} domain={domain} />
        </DataBoxWrap>
      </DashBoard>
    </TemplateWrapper>
  );
};

export default ReportTemplate;

/** ReportTemplate Style */

const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  gap: 33px;
`;

const DashBoard = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0px 150px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  z-index: 10;

  .basic-title {
    margin: 36px 0px 19px;
  }

  .view-title {
    margin: 32px 0px 12px;
  }

  .empty-video {
    width: 350px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart {
    height: 450px;
    align-items: center;
    justify-content: center;
  }
`;

const DataBoxWrap = styled.div`
  width: 100%;
  background: ${COLORS.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: relative;

  .label {
    margin-bottom: 26px;
  }

  .content {
    flex-direction: column;
  }

  .content-txt {
    white-space: pre-wrap;
  }

  .score-txt {
    position: absolute;
    top: 14px;
    right: 19px;
  }

  .data-description {
    line-height: 13px;
  }

  .sy-score {
    font-weight: 700;
    color: ${COLORS.primary};
  }
`;

const TextWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const BasicDataWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .content-box {
    height: 260px;
    padding: 25px;
    margin-left: 25px;
  }

  .data-box {
    width: 300px;
    height: 200px;
  }
`;

export const SYDataWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 45px;

  .sy-score-box {
    width: 400px;
    height: 75px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .sy-text-box {
    height: 75px;
    display: flex;
    justify-content: center;
  }
`;

export const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
`;

export const VideoBox = styled.div`
  width: 336px;
  height: 251px;
  border-radius: 15px;
  position: relative;
  cursor: pointer;

  .icon {
    position: absolute;
    bottom: 14px;
    left: 14px;
  }
`;
