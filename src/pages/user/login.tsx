import { useForm } from 'react-hook-form';
import LoginTemplate from '@/components/LoginTemplate';

import { loginAsync } from '@/apis/user';
import { LoginInputType } from '@/types/user';
import { useRef } from 'react';

const Login = () => {
  const messageRef = useRef(null);
  const { register, handleSubmit } = useForm<LoginInputType>();

  const onSubmitLogin = async (data: LoginInputType) => {
    const { email, password } = data;

    if (email === '' || password === '') {
    }
    const response = await loginAsync(email, password);
    console.log(response);
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
