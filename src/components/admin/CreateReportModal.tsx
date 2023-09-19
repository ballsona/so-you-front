import styled from '@emotion/styled';
import {
  FormProvider,
  useController,
  useForm,
  useWatch,
} from 'react-hook-form';
import { COLORS } from '@/styles/theme';
import { createReportAsync } from '@/apis/admin';
import { useModal } from '@/hooks/useModal';
import { useRouter } from 'next/router';
import TextInput, { TextInputProps } from '../common/TextInput';
import Text from '../common/Text';

const ContentInput = ({
  name,
  placeholder,
  control,
  ...props
}: TextInputProps) => {
  const {
    field: { value, onChange, ...fieldProps },
  } = useController({ name, control });
  return (
    <StyledTextarea
      {...fieldProps}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export interface ReportFormType {
  title: string;
  writer: string;
  link: string;
  content: string;
}

const CreateReportModal = ({ id }: { id: number }) => {
  const { closeModal } = useModal();
  const router = useRouter();

  const formMethods = useForm<ReportFormType>();
  const { handleSubmit, control } = formMethods;

  const { title, writer, link, content } = useWatch<ReportFormType>({
    control,
  });

  const createReport = async () => {
    if (!writer || !title || !link || !content) {
      alert('리포트 값을 모두 작성해주세요!');
      return;
    }

    const res = await createReportAsync(id, { title, writer, link, content });

    if (!res.isSuccess && res.result.code !== 500) {
      alert('리포트를 등록할 수 없습니다.');
      return;
    }

    closeModal();
    alert('리포트 등록을 완료하였습니다.');
    router.push(`/report/${id}`);
  };

  return (
    <FormProvider {...formMethods}>
      <ModalWrapper>
        <Field>
          <Text size={14} weight="700" className="label">
            제 목
          </Text>
          <TextInput name="title" placeholder="리포트 제목" className="input" />
        </Field>
        <Field>
          <Text size={14} weight="700" className="label">
            링크 첨부
          </Text>
          <TextInput name="link" placeholder="링크" className="input" />
        </Field>
        <Field>
          <Text size={14} weight="700" className="label">
            작 성 자
          </Text>
          <TextInput
            name="writer"
            placeholder="작성자 이름"
            className="input"
          />
        </Field>
        <Field className="content-input">
          <Text size={14} weight="700" className="label">
            내 용
          </Text>
          <ContentInput name="content" placeholder="작성자 이름" />
        </Field>
        <Button className="select-btn" onClick={handleSubmit(createReport)}>
          작성 완료
        </Button>
      </ModalWrapper>
    </FormProvider>
  );
};

export default CreateReportModal;

const ModalWrapper = styled.div`
  width: 410px;
  height: 530px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.primary};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;

  position: fixed;
  top: calc(50% - 250px);
  left: calc(50% - 205px);

  .label {
    width: 55px;
    height: 25px;
  }

  .content-input {
    width: 330px;
    flex-direction: column;
    gap: 7px;
  }
`;

const Field = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 330px;

  .input {
    width: 250px;
    height: 25px;
    border: none;
    border-bottom: 1px solid #484848;
    color: #484848;
    padding-left: 5px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 330px;
  height: 260px;
  border: none;
  resize: none;
  background-color: #f8f8f8;
  color: #484848;
  padding: 15px;

  :active {
    border: none;
  }
`;

const Button = styled.button`
  width: 110px;
  height: 38px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 2px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
`;
