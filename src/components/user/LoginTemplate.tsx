import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import { LoginInputType } from '@/types/user';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { UseFormRegister } from 'react-hook-form';

const SUB_MENUS: Record<string, any> = {
  id_find: {
    text: '아이디 찾기',
    url: '/user/find-account',
  },
  pw_find: {
    text: '비밀번호 찾기',
    url: '/user/find-password',
  },
  register: {
    text: '회원가입',
    url: '/user/register',
  },
} as const;

export interface LoginTemplateProps {
  onChangeLoginInput: UseFormRegister<LoginInputType>;
  onSubmitLogin: () => Promise<void>;
}

const LoginTemplate = ({
  onChangeLoginInput,
  onSubmitLogin,
}: LoginTemplateProps) => {
  const router = useRouter();
  return (
    <TemplateWrapper>
      <LoginForm>
        <Text
          size={80}
          weight="800"
          color={COLORS.primary}
          className="logo-text"
        >
          SoYOU
        </Text>
        <LoginInput placeholder="EMAIL" {...onChangeLoginInput('email')} />
        <LoginInput placeholder="PW" {...onChangeLoginInput('password')} />
        <SubMenuContainer>
          {Object.keys(SUB_MENUS).map((key, idx) => (
            <>
              <Text
                key={key}
                size={18}
                weight="400"
                color={COLORS.gray484}
                onClick={() => router.push(SUB_MENUS[key].url)}
              >
                {SUB_MENUS[key].text}
              </Text>
              {idx !== 2 && <Hr />}
            </>
          ))}
        </SubMenuContainer>
        <LoginButton onClick={onSubmitLogin}>로그인</LoginButton>
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
  width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo-text {
    line-height: 80px;
    margin-bottom: 80px;
    cursor: pointer;
  }
`;

const LoginInput = styled.input`
  width: 100%;
  height: 48px;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 12px;

  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.grayB5B};
  border-radius: 4px;
  padding-left: 17px;

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
  gap: 35px;
  margin: 18px 0px 39px;

  > div {
    cursor: pointer;
  }
`;

const Hr = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${COLORS.grayDBD};
`;

const LoginButton = styled.button`
  width: 460px;
  height: 60px;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 20px;
  font-weight: 700;
`;
