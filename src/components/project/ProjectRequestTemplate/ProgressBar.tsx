/* eslint-disable react/no-array-index-key */
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';

interface ProgressBarProps {
  /** 0~4 */
  activeStep: number;
}

const ProgressBar = ({ activeStep }: ProgressBarProps) => (
  <BarWrapper>
    {new Array(5).fill(0).map((v, idx) =>
      activeStep === idx ? (
        <ActiveCircleBorder key={idx}>
          <ActiveCircle>
            <Text size={12} weight="400" color={COLORS.white}>
              {activeStep + 1}
            </Text>
          </ActiveCircle>
        </ActiveCircleBorder>
      ) : (
        <Circle key={idx} />
      ),
    )}
    <Bar />
  </BarWrapper>
);

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
  background-color: ${COLORS.primary_dark};
  position: absolute;
  top: 10px;
  left: 4px;
  z-index: -1;
`;

const Circle = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 8.5px;
  border: 3px solid ${COLORS.primary_dark};
  background-color: ${COLORS.white};
`;

const ActiveCircleBorder = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  border: 2px solid ${COLORS.primary};
  background-color: ${COLORS.white};
  padding: 3px;
`;

const ActiveCircle = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${COLORS.primary};

  display: flex;
  align-items: center;
  justify-content: center;
`;
