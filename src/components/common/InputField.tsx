import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

interface InputFieldProps extends PropsWithChildren {
  label: string;
  className?: string;
}

const InputField = ({ label, className, children }: InputFieldProps) => (
  <InputWrapper className={className}>
    <Label>{label}</Label>
    {children}
  </InputWrapper>
);

export default InputField;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .email-input {
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
