import styled from '@emotion/styled';
import Text from '../common/Text';
import { COLORS } from '@/styles/theme';
import ReportList from './ReportList';

const sData = [
  {
    id: 1,
    title: '유튜버 소유 마케팅 리포트',
    date: '2023.01.01 ~ 2023.01.03',
    cost: 500000,
  },
  {
    id: 2,
    title: '유튜버 소유 마케팅 리포트',
    date: '2023.01.01 ~ 2023.01.03',
    cost: 500000,
  },
  {
    id: 3,
    title: '유튜버 소유 마케팅 리포트',
    date: '2023.01.01 ~ 2023.01.03',
    cost: 500000,
  },
];

const ReportListTemplate = ({ data }: { data?: any }) => {
  const onClickItem = () => {};
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
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 108px;
  padding-bottom: 80px;

  .title {
    margin-bottom: 29px;
  }
`;
