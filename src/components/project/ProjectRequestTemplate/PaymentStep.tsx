import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import Text from '@/components/common/Text';

interface PaymentStepProps {
  goBeforeStep: () => void;
  goNextStep: () => void;
}

const PaymentStep = ({ goBeforeStep, goNextStep }: PaymentStepProps) => (
  <Wrapper>
    <DepositInfoWrap>
      <Text color="#262627" weight="700" size={16} className="title">
        입금정보
      </Text>
      <Text color="#262627" weight="400" size={14}>
        - 은행: 신한은행
      </Text>
      <Text color="#262627" weight="400" size={14}>
        - 계좌번호: 100-036-237446
      </Text>
      <Text color="#262627" weight="400" size={14}>
        - 예금주: (주)퓨처랩
      </Text>
      <Text color="#FC3737" weight="400" size={11} className="caption">
        * 안내사항 매칭 후 14영업일내 입금확인이 되지않을 시 매칭이 자동 취소 될
        수 있습니다.
      </Text>
    </DepositInfoWrap>
    <ButtonsWrap>
      <Button onClick={goBeforeStep} className="cancel-btn">
        뒤로
      </Button>
      <Button onClick={goNextStep} className="payment-btn">
        결제하기
      </Button>
    </ButtonsWrap>
  </Wrapper>
);

export default PaymentStep;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const DepositInfoWrap = styled.div`
  width: 318px;
  border: 1px solid ${COLORS.primary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px;

  .title {
    margin-bottom: 15px;
  }

  .caption {
    margin-top: 14px;
  }
`;

const ButtonsWrap = styled.div`
  margin: 50px auto 0px;
  display: flex;

  .cancel-btn {
    background-color: ${COLORS.grayC4C};
    width: 90px;
    margin-right: 5px;
  }

  .payment-btn {
    background-color: ${COLORS.primary};
    width: 135px;
  }
`;

const Button = styled.button`
  height: 42px;
  color: ${COLORS.white};
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
`;
