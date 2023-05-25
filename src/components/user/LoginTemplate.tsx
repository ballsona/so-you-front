import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';

const SUB_MENUS = {
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
};

const LoginTemplate = () => (
  <TemplateWrapper>
    <LoginForm>
      <Text size={80} weight="800" color={COLORS.primary} className="logo-text">
        SoYOU
      </Text>
      <LoginInput name="id" value="" placeholder="ID" onChange={() => {}} />
      <LoginInput
        name="password"
        value=""
        placeholder="PW"
        onChange={() => {}}
      />
      <SubMenuContainer>
        <Text size={18} weight="400" color={COLORS.gray484} onClick={() => {}}>
          {SUB_MENUS.id_find.text}
        </Text>
        <Hr />
        <Text size={18} weight="400" color={COLORS.gray484} onClick={() => {}}>
          {SUB_MENUS.pw_find.text}
        </Text>
        <Hr />
        <Text size={18} weight="400" color={COLORS.gray484} onClick={() => {}}>
          {SUB_MENUS.register.text}
        </Text>
      </SubMenuContainer>
      <LoginButton onClick={() => {}}>로그인</LoginButton>
    </LoginForm>
  </TemplateWrapper>
);

export default LoginTemplate;

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
  }
`;

const LoginInput = styled.input`
  width: 100%;
  height: 56px;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 8px;

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
`;

const Hr = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${COLORS.grayDBD};
`;

const LoginButton = styled.button`
  width: 460px;
  height: 64px;
  border: 4px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 20px;
  font-weight: 700;
`;
