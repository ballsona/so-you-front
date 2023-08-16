import { useForm } from 'react-hook-form';
import LoginTemplate from '@/components/LoginTemplate';

import { loginAsync } from '@/apis/user';
import { LoginInputType } from '@/types/user';
import { MutableRefObject, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { tokenAtom, userDataAtom } from '@/stores/userState';

const Login = () => {
  const router = useRouter();
  const messageRef =
    useRef<HTMLParagraphElement>() as MutableRefObject<HTMLParagraphElement>;

  const { register, handleSubmit } = useForm<LoginInputType>();

  const [, setToken] = useRecoilState(tokenAtom);
  const [, setUserData] = useRecoilState(userDataAtom);

  const onSubmitLogin = async (data: LoginInputType) => {
    const { email, password } = data;

    // 아이디 및 비밀번호 값 입력했는지 확인
    if (email === '' || password === '') {
      messageRef.current.innerText =
        '아이디 또는 비밀번호를 모두 입력해주세요.';
      return;
    }

    const response = await loginAsync(email, password);
    // 로그인 요청 실패
    if (!response.isSuccess) {
      messageRef.current.innerText = response.result.errorMessage;
      return;
    }
    // 로그인 요청 성공
    const { token, refreshToken, type } = response.result;
    setToken({ token, refreshToken });
    setUserData({ type });

    router.replace('/influencer');
  };

  return (
    <>
      <LoginTemplate
        messageRef={messageRef}
        onChangeLoginInput={register}
        onSubmitLogin={handleSubmit(onSubmitLogin)}
      />
    </>
  );
};

export default Login;
