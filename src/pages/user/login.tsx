import { useForm } from 'react-hook-form';
import LoginTemplate from '@/components/user/LoginTemplate';

import { loginAsync } from '@/apis/user';
import { LoginInputType } from '@/types/user';

const Login = () => {
  const { register, handleSubmit } = useForm<LoginInputType>();

  const onSubmitLogin = async (data: LoginInputType) => {
    const { email, password } = data;
    const response = await loginAsync(email, password);
    console.log(response);
  };

  return (
    <>
      <LoginTemplate
        onChangeLoginInput={register}
        onSubmitLogin={handleSubmit(onSubmitLogin)}
      />
    </>
  );
};

export default Login;
