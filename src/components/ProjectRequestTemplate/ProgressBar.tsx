import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';

interface ProgressBarProps {
  /** 0~4 */
  activeStep: number;
}

const ProgressBar = ({ activeStep }: ProgressBarProps) => {
  return (
    <BarWrapper>
      {new Array(5).fill(0).map((v, idx) =>
        activeStep === idx ? (
          <ActiveCircleBorder key={idx}>
            <ActiveCircle />
          </ActiveCircleBorder>
        ) : (
          <Circle key={idx} />
        ),
      )}
      <Bar />
    </BarWrapper>
  );
};

export default ProgressBar;

const BarWrapper = styled.div`
  width: 287px;
  height: 21px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 60px;
`;

const Bar = styled.div`
  width: 279px;
  height: 1px;
  background-color: #90afeb;
  position: absolute;
  top: 10px;
  left: 4px;
  z-index: -1;
`;

const Circle = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 6.5px;
  background-color: #90afeb;
`;

const ActiveCircleBorder = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 10.5px;
  border: 1px solid #547ac3;
  background-color: ${COLORS.white};
  padding: 2px;
`;

const ActiveCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background-color: #547ac3;
`;
