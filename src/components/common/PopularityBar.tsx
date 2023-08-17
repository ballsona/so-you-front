import { PopularityDegreeType, popularityDegree } from '@/constants/influencer';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';

interface PopularityBarProps {
  isFocused: boolean;
  degree: PopularityDegreeType;
  onClick: () => void;
}

const PopularityBar = ({ isFocused, degree, onClick }: PopularityBarProps) => {
  const Color = COLORS[isFocused ? 'primary' : 'gray3'];

  return (
    <Wrapper color={Color} onClick={onClick}>
      {popularityDegree.map((d) => (
        <Bar key={d} color={d <= degree ? Color : '#EEE'} />
      ))}
    </Wrapper>
  );
};

export default PopularityBar;

const Wrapper = styled.div`
  width: 59px;
  height: 20px;
  border: 1.5px solid ${(props) => props.color};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const Bar = styled.div`
  width: 9px;
  height: 14px;
  background-color: ${(props) => props.color};

  :first-child {
    border-radius: 5px 0px 0px 5px;
  }

  :last-child {
    border-radius: 0px 5px 5px 0px;
  }
`;
