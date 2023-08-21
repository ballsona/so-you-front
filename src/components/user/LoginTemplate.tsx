import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import LoginForm from './LoginForm';
import { COLORS } from '@/styles/theme';

import KakaoLogoIcon from '@/assets/icon/kakao-logo.svg';
import NaverLogoIcon from '@/assets/icon/naver-logo.svg';
import GoogleLogoIcon from '@/assets/icon/google-logo.svg';

const LoginTemplate = () => {
  const onClickSocialLoginButton = () => {
    alert('소셜 로그인은 준비중이에요☺️');
  };

  return (
    <TemplateWrapper>
      <FormWrapper>
        <Text
          size={55}
          weight="700"
          color={COLORS.primary}
          className="logo-text"
        >
          SoYOU
        </Text>
        <LoginForm />
        <DivisionContainer>
          <Line />
          <Text color={COLORS.primary} size={12} className="division-text">
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
      </FormWrapper>
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
  background-color: #e9edf5;
`;

const FormWrapper = styled.div`
  width: 420px;
  height: 500px;
  background-color: #fff;
  border: 1px solid rgba(98, 144, 233, 0.5);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  .google-btn {
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

  svg {
    margin-right: 9px;
  }
`;
