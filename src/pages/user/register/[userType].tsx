import { registerAsync } from '@/apis/user';
import CategorySelectModal from '@/components/common/CategorySelectModal';
import RegisterTemplate from '@/components/user/RegisterTemplate';
import { ThemeType } from '@/constants/influencer';
import { RegisterInputType, userType } from '@/types/user';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const router = useRouter();
  const userType = router.query.userType as userType;

  const { register, handleSubmit } = useForm<RegisterInputType>();
  const [category, setCategory] = useState([]);

  const onSubmitRegister = async (data: RegisterInputType) => {
    const { email, password, name, birth_date, category, channel, cost } = data;
    const response = await registerAsync(
      'client',
      email,
      password,
      name,
      birth_date,
      //category,
      channel,
      cost,
    );
    console.log(response);
  };
  return (
    <>
      <RegisterTemplate
        type={userType}
        onChangeInput={register}
        onSubmitRegister={handleSubmit(onSubmitRegister)}
      />
      <CategorySelectModal />
    </>
  );
};

export default Register;
