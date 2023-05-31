import { registerAsync } from '@/apis/user';
import CategorySelectModal from '@/components/common/CategorySelectModal';
import RegisterTemplate from '@/components/user/RegisterTemplate';
import { ThemeType } from '@/constants/influencer';
import { RegisterInputType, userType } from '@/types/user';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const router = useRouter();
  const userType = router.query.userType as userType;

  const { register, handleSubmit } = useForm<RegisterInputType>();

  // 카테고리 모달 열림 여부
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  // 카테고리 배열
  const [category, setCategory] = useState<Array<ThemeType>>([]);

  const handleModal = () => setIsModalOpened((prev) => !prev);

  const onClickCategory = (theme: ThemeType) => {
    if (!category.includes(theme)) {
      setCategory((prev) => [...prev, theme]);
    } else {
      setCategory((prev) => prev.filter((t) => t !== theme));
    }
  };

  const onSubmitRegister = async (data: RegisterInputType) => {
    const { email, password, name, birth_date, channel, cost } = data;
    const response = await registerAsync(
      userType,
      email,
      password,
      name,
      birth_date,
      channel,
      cost,
      category,
    );
    console.log(response);
  };
  return (
    <>
      {isModalOpened && (
        <ModalContainer>
          <CategorySelectModal
            category={category}
            handleModal={handleModal}
            onClickCategory={onClickCategory}
          />
        </ModalContainer>
      )}
      <RegisterTemplate
        type={userType}
        handleModal={handleModal}
        onChangeInput={register}
        onSubmitRegister={handleSubmit(onSubmitRegister)}
      />
    </>
  );
};

export default Register;

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
`;
