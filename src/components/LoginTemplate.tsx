import { Fragment, MutableRefObject } from 'react';
import { useRouter } from 'next/router';
import { UseFormRegister } from 'react-hook-form';
import styled from '@emotion/styled';
import Text from '@/components/common/Text';

import { NAV_INFO } from '@/constants/navigation';
import { COLORS } from '@/styles/theme';
import { LoginInputType } from '@/types/user';

import KakaoLogoIcon from '@/assets/icon/kakao-logo.svg';
import NaverLogoIcon from '@/assets/icon/naver-logo.svg';
import GoogleLogoIcon from '@/assets/icon/google-logo.svg';

const SUB_MENU = ['id_find', 'pw_find', 'register'];

export interface LoginTemplateProps {
  messageRef: MutableRefObject<HTMLParagraphElement>;
  onChangeLoginInput: UseFormRegister<LoginInputType>;
  onSubmitLogin: () => Promise<void>;
}

const LoginTemplate = ({
  messageRef,
  onChangeLoginInput,
  onSubmitLogin,
}: LoginTemplateProps) => {
  const router = useRouter();
  const onClickSocialLoginButton = () => {
    alert('소셜 로그인은 준비중이에요☺️');
  };

  return (
    <TemplateWrapper>
      <LoginForm>
        <Text
          size={55}
          weight="700"
          color={COLORS.primary}
          className="logo-text"
        >
          SoYOU
        </Text>
        <LoginMessageBox ref={messageRef} />
        <LoginInput placeholder="EMAIL" {...onChangeLoginInput('email')} />
        <LoginInput placeholder="PW" {...onChangeLoginInput('password')} />
        <SubMenuContainer>
          {SUB_MENU.map((menu, idx) => (
            <Fragment key={menu}>
              <Text
                size={13}
                weight="400"
                color={COLORS.gray484}
                onClick={() => router.push(NAV_INFO[menu].url)}
              >
                {NAV_INFO[menu].text}
              </Text>
              {idx !== 2 && <Hr />}
            </Fragment>
          ))}
        </SubMenuContainer>
        <LoginButton onClick={onSubmitLogin}>로그인</LoginButton>
        <DivisionContainer>
          <Line />
          <Text
            color={COLORS.primary}
            size={12}
            weight="400"
            className="division-text"
          >
            or
          </Text>
          <Line />
        </DivisionContainer>
        <SocialLoginContainer>
          <SocialLoginButton color="#FEE500" onClick={onClickSocialLoginButton}>
            <KakaoLogoIcon />
            <Text size={12} color={COLORS.black}>
              로그인
            </Text>
          </SocialLoginButton>
          <SocialLoginButton color="#50BD61" onClick={onClickSocialLoginButton}>
            <NaverLogoIcon />
            <Text size={12} color={COLORS.white}>
              로그인
            </Text>
          </SocialLoginButton>
          <SocialLoginButton
            color={COLORS.white}
            onClick={onClickSocialLoginButton}
            className="google-btn"
          >
            <GoogleLogoIcon />
            <Text size={12} color={COLORS.gray484}>
              로그인
            </Text>
          </SocialLoginButton>
        </SocialLoginContainer>
      </LoginForm>
    </TemplateWrapper>
  );
};

export default LoginTemplate;

/** LoginTemplate Style */

const TemplateWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.div`
  width: 420px;
  height: 500px;
  border: 1px solid rgba(98, 144, 233, 0.5);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo-text {
    margin-bottom: 21px;
    cursor: pointer;
  }
`;

const LoginMessageBox = styled.p`
  font-size: 11px;
  font-weight: 300;
  color: ${COLORS.caption};
  height: 12px;
  margin-bottom: 10px;
`;

const LoginInput = styled.input`
  width: 290px;
  height: 33px;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 7px;

  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.grayB5B};
  border-radius: 4px;
  padding-left: 10px;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${COLORS.grayC4C};
  }
`;

const SubMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin: 17px 0px 24px;

  > div {
    cursor: pointer;
  }
`;

const Hr = styled.div`
  width: 1px;
  height: 15px;
  background-color: ${COLORS.grayDBD};
`;

const LoginButton = styled.button`
  width: 290px;
  height: 36px;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 15px;
  font-weight: 500;
`;

const DivisionContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px 24px;

  .division-text {
    margin: 0px 16px;
  }
`;

const Line = styled.div`
  width: 123px;
  height: 1px;
  background-color: rgba(98, 144, 233, 0.5);
`;

const SocialLoginContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 5.5px;

  > .google-btn {
    border: 1px solid #cccccc;
  }
`;

const SocialLoginButton = styled.button`
  background-color: ${(props) => props.color};
  width: 91px;
  height: 37px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    margin-right: 9px;
  }
`;
