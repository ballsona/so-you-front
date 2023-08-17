import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { COLORS } from '@/styles/theme';
import { userType } from '@/types/user';
import Text from '@/components/common/Text';
import AppLogo from '@/assets/icon/app-logo.svg';
import RegisterForm from './RegisterForm';

type PE = HTMLParagraphElement;
export interface RegisterTemplateProps {
  type: userType;
}

const RegisterTemplate = ({ type }: RegisterTemplateProps) => {
  const router = useRouter();
  const userType = type === 'influencer' ? '인플루언서' : '광고주';

  return (
    <TemplateWrapper>
      <AppLogo className="app-logo" onClick={() => router.push('/')} />
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        {userType} 등록
      </Text>
      <RegisterForm type={type} />
    </TemplateWrapper>
  );
};

export default RegisterTemplate;

/** RegisterTemplate Style */

const TemplateWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  .app-logo {
    position: absolute;
    top: 25px;
    left: 21px;
    cursor: pointer;
  }

  .title {
    margin: 0 auto 44px;
  }
`;
