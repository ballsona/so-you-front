import { COLORS } from '@/styles/theme';
import IntroSection from './common/IntroSection';
import Text from './common/Text';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { NAV_INFO } from '@/constants/navigation';

const MainTemplate = () => {
  const router = useRouter();
  return (
    <TemplateWrapper>
      <Text
        size={18}
        color={COLORS.white}
        className="login-btn"
        onClick={() => router.push(NAV_INFO.login.url)}
      >
        Log-in
      </Text>
      <IntroSection introText />
    </TemplateWrapper>
  );
};

export default MainTemplate;

/** MainTemplate Style */

const TemplateWrapper = styled.div`
  .login-btn {
    position: absolute;
    top: 30px;
    right: 45px;
    z-index: 100;
    cursor: pointer;
  }
`;
