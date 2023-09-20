import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import Text from '@/components/common/Text';

import CardIcon from '@/assets/icon/payment/card.svg';
import PhoneIcon from '@/assets/icon/payment/phone.svg';
import DepositIcon from '@/assets/icon/payment/deposit.svg';

const paymentMenu = [
  { type: '일반결제', menu: '신용카드', icon: <CardIcon /> },
  { type: '카드간편결제', menu: '휴대폰', icon: <PhoneIcon /> },
  { type: '계좌간편결제', menu: '계좌이체', icon: <DepositIcon /> },
];

interface PaymentStepProps {
  goBeforeStep: () => void;
  goNextStep: () => void;
}

const PaymentStep = ({ goBeforeStep, goNextStep }: PaymentStepProps) => (
  <Wrapper>
    <PaymentMenuList>
      {paymentMenu.map(({ type, menu, icon }, idx) => (
        <MenuWrap key={type}>
          <Text color={COLORS.white} weight="700" size={14} className="type">
            {type}
          </Text>
          <Menu className={idx === 2 ? 'deposit' : ''}>
            <Text
              color={idx === 2 ? COLORS.primary : COLORS.black}
              weight="400"
              size={14}
              className="menu"
            >
              {menu}
            </Text>
            {icon}
          </Menu>
        </MenuWrap>
      ))}
    </PaymentMenuList>
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
  align-items: center;
  gap: 48px;
`;

const PaymentMenuList = styled.div`
  display: flex;
`;

const MenuWrap = styled.div`
  cursor: pointer;

  .type {
    width: 200px;
    height: 43px;
    background-color: ${COLORS.primary};

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .deposit {
    background-color: #f4f6fa;
  }
`;

export const Menu = styled.div`
  width: 200px;
  height: 150px;
  background-color: ${COLORS.white};
  box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .menu {
    margin-bottom: 7px;
  }
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
