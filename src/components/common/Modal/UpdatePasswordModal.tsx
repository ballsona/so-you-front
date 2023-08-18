import styled from '@emotion/styled';
import { COLORS } from '@/styles/theme';
import Text from '@/components/common/Text';
import CloseIcon from '@/assets/icon/close.svg';
import { useRouter } from 'next/router';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../TextInput';
import { updatePasswordAsync } from '@/apis/user';

interface InputType {
  password: string;
  passwordCheck: string;
}

const UpdatePasswordModal = ({ name, birth_date }: any) => {
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(false);

  const formFields = useForm<InputType>({
    defaultValues: {
      password: '',
      passwordCheck: '',
    },
  });

  const { handleSubmit } = formFields;

  const updatePassword = async (data: InputType) => {
    const { password, passwordCheck } = data;

    if (!password || !passwordCheck || password !== passwordCheck) {
      setDisabled(true);
      return;
    }

    const res = await updatePasswordAsync(name, birth_date, password);

    if (res.isSuccess) {
      setDisabled(false);
      alert('비밀번호를 성공적으로 변경하였습니다');
      closeModal();
    }
  };
  return (
    <FormProvider {...formFields}>
      <ModalWrapper>
        <CloseIcon className="close-icon" onClick={closeModal} />
        <Text
          size={20}
          weight="700"
          color={COLORS.gray484}
          className="modal-title"
        >
          비밀번호 변경
        </Text>
        <InputWrap>
          <Label>비밀번호</Label>
          <TextInput
            type="password"
            name="password"
            placeholder="숫자, 영문 포함 8글자 이상"
          />
        </InputWrap>

        <InputWrap>
          <Label>비밀번호 확인</Label>
          <TextInput
            type="password"
            name="passwordCheck"
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
        </InputWrap>
        {disabled && (
          <Text
            size={12}
            weight="300"
            color={COLORS.gray484}
            className="disabled-text"
          >
            입력하신 값을 다시 확인해주세요
          </Text>
        )}
        <Button className="detail-btn" onClick={handleSubmit(updatePassword)}>
          변경하기
        </Button>
      </ModalWrapper>
    </FormProvider>
  );
};

export default UpdatePasswordModal;

/** UpdatePasswordModal Style */

const ModalWrapper = styled.div`
  width: 400px;
  height: 280px;
  background-color: ${COLORS.white};
  box-shadow: 0px 0px 5px rgba(136, 136, 136, 0.23);
  border-radius: 8px;
  padding: 30px 20px;
  overflow: hidden;

  position: relative;
  top: calc(50% - 180px);
  left: calc(50% - 140px);

  .close-icon {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
  }
  .modal-title {
    margin-bottom: 30px;
  }

  .disabled-text {
    width: fit-content;
    position: absolute;
    left: calc(50% - 75px);
    bottom: 55px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  color: ${COLORS.white};
  background-color: ${COLORS.primary};

  position: absolute;
  left: 0;
  bottom: 0;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  input {
    width: 250px;
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
