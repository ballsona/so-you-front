import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import Youtube from 'react-youtube';
interface ReportTemplateProps {
  data: any;
}

const ReportTemplate = ({ data }: ReportTemplateProps) => {
  const { report_content, report_link, report_name, report_title } = data;
  const youtubeId = report_link.split('?')[1]?.split('&')[0]?.split('=')[1];
  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        리포트
      </Text>
      <DashBoard>
        <BasicDataWrap>
          {youtubeId ? (
            <Youtube
              videoId={youtubeId}
              opts={{
                width: 350,
                height: 200,
              }}
            />
          ) : (
            <DataBoxWrap className="empty-video">영상이 없습니다</DataBoxWrap>
          )}

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
              <Text size={14} weight="400" color={COLORS.gray484}>
                {report_content}
              </Text>
            </TextWrap>
          </DataBoxWrap>
        </BasicDataWrap>

        <Text
          size={18}
          weight="700"
          color={COLORS.gray484}
          className="view-title"
        >
          · 영상 조회수
        </Text>
        <DataBoxWrap>영상 조회수 데이터는 준비중입니다</DataBoxWrap>
      </DashBoard>
    </TemplateWrapper>
  );
};

export default ReportTemplate;

/** ReportTemplate Style */

const TemplateWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fbfcff;
  padding-top: 108px;

  .title {
    width: fit-content;
    margin: 0px auto 29px;
    padding-top: 48px;
  }
`;

const DashBoard = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

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
`;

const DataBoxWrap = styled.div`
  width: 100%;
  background: ${COLORS.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  .content {
    flex-direction: column;
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

  .content-box {
    height: 200px;
    margin-left: 25px;
  }

  .data-box {
    width: 250px;
    height: 150px;
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  gap: 10px;

  .channel-img {
    border-radius: 30px;
    background-color: #f6f6f6;
    border: 1px solid #cdcdcd;
  }
`;

const CostWrap = styled.div`
  width: 150px;
`;
