import { userType } from '@/types/user';
import MyPageForm from './MyPageForm';
import styled from '@emotion/styled';
import Text from '../common/Text';
import { COLORS } from '@/styles/theme';

interface MyPageTemplateProps {
  type: userType;
  data: any;
}

const MyPageTemplate = ({ type, data }: MyPageTemplateProps) => {
  const { email, name, birth_date, category, cost, youtube_link, channel_id } =
    data;
  const basicData = { email, name, birth_date };
  const influencerData = { category, cost, youtube_link, channel_id };

  const defaultData =
    type === 'client' ? basicData : { ...basicData, ...influencerData };

  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        마이페이지
      </Text>
      <MyPageForm type={type} defaultData={defaultData} />
    </TemplateWrapper>
  );
};

export default MyPageTemplate;

const TemplateWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .title {
    margin: 0 auto 44px;
  }
`;
