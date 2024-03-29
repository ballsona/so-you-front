import styled from '@emotion/styled';
import { COLORS } from '@/styles/theme';
import { useRouter } from 'next/router';
import Text from '../common/Text';
import ReportList from './ReportList';
import { sData } from './ReportDetailTemplate';

const ReportListTemplate = ({ data }: { data?: any }) => {
  const router = useRouter();
  const onClickItem = (id: number) => router.push(`/report/${id}`);
  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        리포트 관리
      </Text>
      <ReportList data={sData} onClickItem={onClickItem} />
    </TemplateWrapper>
  );
};

export default ReportListTemplate;

const TemplateWrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - 188px);
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 29px;
  }
`;
