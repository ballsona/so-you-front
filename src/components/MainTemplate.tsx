import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { NAV_INFO } from '@/constants/navigation';
import { removeTokenAsync, removeUserTypeAsync } from '@/apis/auth';
import Text from './common/Text';
import IntroSection from './common/IntroSection';

const MainTemplate = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  const onClickAuthButton = async () => {
    if (isLoggedIn) {
      // 로그아웃
      await removeTokenAsync();
      await removeUserTypeAsync();
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
