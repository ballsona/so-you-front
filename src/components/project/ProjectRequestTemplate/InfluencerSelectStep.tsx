import InfluencerList from '@/components/influencer/InfluencerList';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';

const InfluencerSelectStep = ({
  influencerList,
  onClickInfluencer,
  goBeforeStep,
}: any) => (
  <Wrapper>
    <InfluencerList data={influencerList} onClickItem={onClickInfluencer} />
    <Button onClick={goBeforeStep}>뒤로</Button>
  </Wrapper>
);

export default InfluencerSelectStep;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 129px;
  height: 42px;
  color: ${COLORS.white};
  background-color: ${COLORS.primary};
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
`;
