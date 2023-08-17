import { Fragment, MutableRefObject, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import TextInput from '@/components/common/TextInput';

import { NAV_INFO } from '@/constants/navigation';
import { COLORS } from '@/styles/theme';
import { LoginFormType, userType } from '@/types/user';
import { loginAsync } from '@/apis/user';
import { userTypeAtom } from '@/stores/userState';

const SUB_MENU = ['id_find', 'pw_find', 'register'];

const LoginForm = () => {
  const router = useRouter();

  const [, setUserType] = useRecoilState(userTypeAtom);

  const messageRef =
    useRef<HTMLParagraphElement>() as MutableRefObject<HTMLParagraphElement>;

  const formMethods = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { handleSubmit } = formMethods;

  const login = async (data: LoginFormType) => {
    const { email, password } = data;

    // 아이디 및 비밀번호 값 입력했는지 확인
    if (email === '' || password === '') {
      messageRef.current.innerText =
        '아이디 또는 비밀번호를 모두 입력해주세요.';
      return;
    }

    const res = await loginAsync(email, password);
    // 로그인 요청 실패
    if (!res.isSuccess) {
      messageRef.current.innerText = res.result.errorMessage;
      return;
    }
    // 로그인 요청 성공
    const { token, refreshToken, type, email: rEmail } = res.result;
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('refreshToken', refreshToken);

    setUserType(type as userType);

    router.replace('/influencer');
  };

  return (
    <FormProvider {...formMethods}>
      <Wrapper>
        <MessageBox ref={messageRef} />
        <TextInput name="email" placeholder="EMAIL" className="login-input" />
        <TextInput name="password" placeholder="PW" className="login-input" />
        <SubMenuContainer>
          {SUB_MENU.map((menu, idx) => (
            <Fragment key={menu}>
              <Text
                size={13}
                color={COLORS.gray484}
                onClick={() => router.push(NAV_INFO[menu].url)}
              >
                {NAV_INFO[menu].text}
              </Text>
              {idx !== 2 && <Hr />}
            </Fragment>
          ))}
        </SubMenuContainer>
        <LoginButton onClick={handleSubmit(login)}>로그인</LoginButton>
      </Wrapper>
    </FormProvider>
  );
};

export default LoginForm;

/** LoginForm Style */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo-text {
    margin-bottom: 21px;
    cursor: pointer;
  }

  .login-input {
    width: 290px;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 7px;

    background-color: ${COLORS.white};
    border: 1px solid ${COLORS.grayB5B};
    border-radius: 4px;
    padding-left: 10px;

    ::placeholder {
      color: ${COLORS.grayC4C};
    }
  }
`;

const MessageBox = styled.p`
  font-size: 11px;
  font-weight: 300;
  color: ${COLORS.caption};
  height: 12px;
  margin-bottom: 10px;
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
