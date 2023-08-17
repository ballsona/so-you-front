import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { RegisterFormType, userType } from '@/types/user';
import { COLORS } from '@/styles/theme';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import { useModal } from '@/hooks/useModal';
import {
  registerAsync,
  verifyEmailAsync,
  verifyEmailCodeAsync,
} from '@/apis/user';
import { categoryListAtom } from '@/stores/categoryState';

import TextInput from '../common/TextInput';
import CategoryTag from '../common/CategoryTag';
import CategorySelectModal from '../common/Modal/CategorySelectModal';
import { validateDate, validatePw } from '@/utils/validation';
import { NAV_INFO } from '@/constants/navigation';

type PE = HTMLParagraphElement;

interface RegisterFormProps {
  type: userType;
}

const EMAIL_BTN_LABEL = ['인증', '확인', '인증 완료'];

const RegisterForm = ({ type }: RegisterFormProps) => {
  const router = useRouter();

  const { openModal } = useModal();

  const [emailVerifyStatus, setEmailVerifyStatus] = useState(1);
  const { messageRefs, setMessage } = useMessageRefs();

  const selectedCategories = useRecoilValue(categoryListAtom);

  const formMethods = useForm<RegisterFormType>();
  const { control, handleSubmit } = formMethods;

  const [email, verifyCode] = useWatch({
    control,
    name: ['email', 'emailVerifyCode'],
  });

  const user = type === 'influencer' ? '인플루언서' : '광고주';

  const verifyEmail = async () => {
    if (email === '' || !email.includes('@')) {
      setMessage(0, '이메일을 올바르게 입력해주세요');
      return;
    }

    // 이메일 인증 요청
    if (emailVerifyStatus === 1) {
      const response = await verifyEmailAsync(email);
      if (response.isSuccess) {
        setEmailVerifyStatus(2);
        setMessage(
          0,
          '이메일로 인증 코드를 발송했습니다. 5분 이내에 코드를 입력해주세요',
        );
      } else {
        setMessage(0, response.result.errorMessage);
      }
      return;
    }
    // 이메일 인증 코드 검증 요청
    if (emailVerifyStatus === 2) {
      const response = await verifyEmailCodeAsync(email, verifyCode);
      if (response.isSuccess) {
        setEmailVerifyStatus(3);
        setMessage(0, '인증에 성공하였습니다');
      } else {
        setMessage(0, response.result.errorMessage);
      }
      return;
    }
  };

  const register = async (data: RegisterFormType) => {
    const {
      email,
      password,
      passwordCheck,
      name,
      birth_date,
      youtube_link,
      cost,
    } = data;

    if (emailVerifyStatus !== 3) {
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
      type,
      email,
      password,
      name,
      birth_date,
      youtube_link,
      cost,
      selectedCategories,
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
    <FormProvider {...formMethods}>
      <Wrapper>
        <MessageBox ref={(node: PE) => (messageRefs.current[0] = node)} />
        <InputWrap>
          <Label>이메일</Label>
          <TextInput
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            disabled={emailVerifyStatus === 3}
            className="input-with-btn"
          />
          {emailVerifyStatus === 2 && (
            <TextInput
              name="emailVerifyCode"
              placeholder="인증코드"
              className="code-input"
            />
          )}
          <MiniButton
            onClick={verifyEmail}
            className={emailVerifyStatus === 3 ? 'verified-btn' : ''}
          >
            {EMAIL_BTN_LABEL[emailVerifyStatus - 1]}
          </MiniButton>
        </InputWrap>
        <MessageBox ref={(node: PE) => (messageRefs.current[1] = node)} />
        <InputWrap>
          <Label>비밀번호</Label>
          <TextInput
            type="password"
            name="password"
            placeholder="숫자, 영문 포함 8글자 이상"
          />
        </InputWrap>
        <MessageBox ref={(node: PE) => (messageRefs.current[2] = node)} />
        <InputWrap>
          <Label>비밀번호 확인</Label>
          <TextInput
            type="password"
            name="passwordCheck"
            placeholder="비밀번호를 한번 더 입력해주세요"
            className="password-check-input"
          />
        </InputWrap>
        <InputWrap>
          <Label>이름</Label>
          <TextInput
            name="name"
            placeholder={`${user}님의 이름을 입력해주세요`}
          />
        </InputWrap>
        <MessageBox ref={(node: PE) => (messageRefs.current[3] = node)} />
        <InputWrap>
          <Label>생년월일</Label>
          <TextInput
            type="number"
            name="birth_date"
            placeholder={`${user}님의 생년월일을 입력해주세요 (YYYY-MM-DD)`}
          />
        </InputWrap>

        {type === 'influencer' && (
          <>
            <InputWrap className="category-row">
              <Label>카테고리</Label>
              {selectedCategories.map((category) => (
                <CategoryTag key={category} theme={category} />
              ))}
              <MiniButton
                onClick={() => openModal(<CategorySelectModal />, true)}
              >
                {selectedCategories.length > 0 ? '수정' : '추가'}
              </MiniButton>
            </InputWrap>
            <MessageBox ref={(node: PE) => (messageRefs.current[4] = node)} />
            <InputWrap>
              <Label>예상 광고비</Label>
              <TextInput name="cost" placeholder="예상 광고비를 입력해주세요" />
            </InputWrap>
            <InputWrap>
              <Label>채널 링크</Label>
              <TextInput
                name="youtube_link"
                placeholder="연결할 유튜브 링크를 등록해주세요"
              />
            </InputWrap>
          </>
        )}
        <ButtonsWrap>
          <Button onClick={() => router.back()} className="cancel-btn">
            뒤로
          </Button>
          <Button onClick={handleSubmit(register)} className="submit-btn">
            등록하기
          </Button>
        </ButtonsWrap>
      </Wrapper>
    </FormProvider>
  );
};

export default RegisterForm;

const Wrapper = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .category-row {
    width: 1000px;
  }
`;

const MessageBox = styled.p`
  width: 100%;
  height: 18px;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
  color: ${COLORS.primary};
  margin-top: -16px;
  margin-left: 116px;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .input-with-btn {
    width: 250px;
  }
  .code-input {
    width: 80px;
    margin-left: 4px;
  }

  .verified-btn {
    background-color: ${COLORS.grayA3A};
  }
`;

const Label = styled.div`
  width: 100px;
  height: 32px;
  border-right: 3px solid ${COLORS.primary};
  font-size: 15px;
  font-weight: 600;
  line-height: 32px;
  margin-right: 16px;
`;

const MiniButton = styled.button`
  width: 80px;
  height: 32px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border-radius: 2px;
  margin-left: 4px;
`;

const ButtonsWrap = styled.div`
  margin: 50px auto 0px;
  display: flex;

  .cancel-btn {
    background-color: ${COLORS.grayC4C};
    width: 100px;
    margin-right: 5px;
  }

  .submit-btn {
    background-color: ${COLORS.primary};
    width: 160px;
  }
`;

const Button = styled.button`
  height: 36px;
  color: ${COLORS.white};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
`;
