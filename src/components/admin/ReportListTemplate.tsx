import styled from '@emotion/styled';
import Text from '../common/Text';
import { COLORS } from '@/styles/theme';
import ReportList from './ReportList';
import { useRouter } from 'next/router';
import { sData } from './ReportTemplate';

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
  height: calc(100vh - 188px);
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 29px;
  }
`;
