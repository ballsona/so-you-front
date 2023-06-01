import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import { InfluencerListData } from '../dummyData';

interface InfluencerListTemplateProps {
  handleModal: () => void;
  onClickInfluencerItem: (id: number) => void;
}

const InfluencerListTemplate = ({
  onClickInfluencerItem,
}: InfluencerListTemplateProps) => {
  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        인플루언서
      </Text>
      <TableHeader>
        <Field>순위</Field>
        <Field>프로필 정보</Field>
        <Field>카테고리</Field>
        <Field>예산</Field>
      </TableHeader>
      {InfluencerListData.map((influencer) => (
        <TableBody
          key={influencer.ranking}
          onClick={() => onClickInfluencerItem(influencer.influencer_id)}
        >
          <Data>
            <Text size={14} color={COLORS.gray484}>
              {influencer.ranking}
            </Text>
          </Data>
          <Data className="profile-data">
            <ProfileImg />
            <ProfileTextWrap>
              <Text size={14} weight="700" color={COLORS.gray484}>
                {influencer.name}
              </Text>
              <Text size={12} color={COLORS.gray818}>
                {influencer.followersCount}명 구독
              </Text>
            </ProfileTextWrap>
          </Data>
          <Data>
            <Text size={14} weight="700" color="#547AC3">
              {influencer.category.join(', ')}
            </Text>
          </Data>
          <Data>
            <Text size={14} color={COLORS.gray484}>
              {influencer.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </Text>
          </Data>
        </TableBody>
      ))}
    </TemplateWrapper>
  );
};

export default InfluencerListTemplate;

/** InfluencerListTemplate Style */

const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    margin: 48px 0px 29px;
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 150px 240px 240px 170px;

  .profile-data {
    display: flex;
    align-items: center;
  }
`;

const TableBody = styled.div`
  display: grid;
  grid-template-columns: 150px 240px 240px 170px;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Field = styled.div`
  height: 40px;
  border-top: 1px solid ${COLORS.primary};
  border-bottom: 1px solid ${COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.primary};
`;

const Data = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f6f6f6;
  border: 1px solid #cdcdcd;
  margin-right: 16px;
`;

const ProfileTextWrap = styled.div``;
