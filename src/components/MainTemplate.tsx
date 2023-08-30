import { COLORS } from '@/styles/theme';
import IntroSection from './common/IntroSection';
import Text from './common/Text';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { NAV_INFO } from '@/constants/navigation';
import { removeTokenAsync } from '@/apis/auth';

const MainTemplate = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  const onClickAuthButton = async () => {
    if (isLoggedIn) {
      await removeTokenAsync();
      router.reload();
    } else {
      router.push(NAV_INFO.login.url);
    }
  };

  return (
    <TemplateWrapper>
      <Text
        size={18}
        color={COLORS.white}
        className="auth-btn"
        onClick={onClickAuthButton}
      >
        {isLoggedIn ? 'Log-out' : 'Log-in'}
      </Text>
      <IntroSection isDetailed isLoggedIn={isLoggedIn} />
    </TemplateWrapper>
  );
};

export default MainTemplate;

/** MainTemplate Style */

const TemplateWrapper = styled.div`
  .auth-btn {
    position: absolute;
    top: 30px;
    right: 45px;
    z-index: 100;
    cursor: pointer;
  }
`;
