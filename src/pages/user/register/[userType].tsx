import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import {
  verifyEmailAsync,
  verifyEmailCodeAsync,
  registerAsync,
} from '@/apis/user';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import { validateDate, validatePw } from '@/utils/validation';
import { ThemeType } from '@/constants/influencer';
import { NAV_INFO } from '@/constants/navigation';
import { emailVerifyCodeAtom, emailVerifyStatusAtom } from '@/stores/userAtom';
import { userType, RegisterInputType } from '@/types/user';

import CategorySelectModal from '@/components/common/CategorySelectModal';
import RegisterTemplate from '@/components/RegisterTemplate';

const Register = () => {
  const router = useRouter();
  const userType = router.query.userType as userType;

  const { messageRefs, setMessage } = useMessageRefs();
  const { register, watch, handleSubmit } = useForm<RegisterInputType>();

  // 이메일 인증 관련
  const [verifyStatus, setVerifyStatus] = useRecoilState(emailVerifyStatusAtom);
  const verifyCode = useRecoilValue(emailVerifyCodeAtom);

  // 카테고리 선택 모달 열림 여부
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleModal = () => setIsModalOpened((prev) => !prev);

  // 선택된 카테고리 배열
  const [category, setCategory] = useState<Array<ThemeType>>([]);

  // 새로 페이지 진입할 때마다 verifyStatus 초기화 시켜줌
  useEffect(() => {
    setVerifyStatus(1);
  }, []);

  const onClickCategory = (theme: ThemeType) => {
    if (!category.includes(theme) && category.length >= 5) {
      alert('카테고리는 5개 이하로 선택해주세요');
    } else if (!category.includes(theme) && category.length < 5) {
      setCategory((prev) => [...prev, theme]);
    } else {
      setCategory((prev) => prev.filter((t) => t !== theme));
    }
  };

  const onVerifyEmail = async () => {
    const email = watch('email');

    if (email === '' || !email.includes('@')) {
      setMessage(0, '이메일을 올바르게 입력해주세요');
      return;
    }
    // 이메일 인증 요청
    if (verifyStatus === 1) {
      const response = await verifyEmailAsync(email);
      if (response.isSuccess) {
        setVerifyStatus(2);
        setMessage(
          0,
          '이메일로 인증 코드를 발송했습니다. 5분 이내에 코드를 입력해주세요',
        );
      } else {
        console.log(response);
        setMessage(0, response.result.errorMessage);
      }
      return;
    }
    // 이메일 인증 코드 검증 요청
    if (verifyStatus === 2) {
      const response = await verifyEmailCodeAsync(email, verifyCode);
      if (response.isSuccess) {
        setVerifyStatus(3);
        setMessage(0, '인증에 성공하였습니다');
      } else {
        setMessage(0, response.result.errorMessage);
      }
      return;
    }
  };

  const onSubmitRegister = async (data: RegisterInputType) => {
    const {
      email,
      password,
      passwordCheck,
      name,
      birth_date,
      youtube_link,
      cost,
    } = data;

    if (verifyStatus !== 3) {
      setMessage(0, '이메일 인증을 진행해주세요');
      return;
    }
    if (password === '' || !validatePw(password)) {
      setMessage(1, '비밀번호를 올바르게 다시 설정해주세요');
      return;
    }
    if (password !== passwordCheck) {
      setMessage(2, '비밀번호를 다시 확인해주세요');
      return;
    }
    if (!validateDate(birth_date)) {
      setMessage(3, '생년월일 형식이 유효하지 않습니다');
      return;
    }
    if (cost && cost < 0) {
      setMessage(4, '예상 광고비가 올바르지 않습니다');
      return;
    }

    const response = await registerAsync(
      userType,
      email,
      password,
      name,
      birth_date,
      youtube_link,
      cost,
      category,
    );
    // 회원가입 성공
    if (response.isSuccess) {
      router.replace(NAV_INFO.login.url);
    }
    // 회원가입 실패
    else {
      alert('회원가입에 실패했어요😢 다시 시도하시거나 문의해주세요');
    }
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
        messageRefs={messageRefs}
        categoryList={category}
        handleModal={handleModal}
        onChangeInput={register}
        onVerifyEmail={onVerifyEmail}
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
  z-index: 25;
  position: absolute;
  top: 0;
  left: 0;
`;
