import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import {
  useController,
  type Control,
  type FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';

export type TextInputProps<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
> = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  UseControllerProps<T, U> & {
    /** Input placeholder */
    placeholder: string;
    /** 높이를 기준으로 분류되는 사이즈 타입 (각각 높이: 45/50/60px, default:) */
    sizeType?: 'small' | 'medium' | 'large';
    /** 배경색 채울지에 대한 여부 (default : false) */
    isFilled?: boolean;
    /** Input 테두리 둥글게 할지 여부 (default : false)  */
    isRound?: boolean;
    /** 실제 value 와는 다르지만 Input 태그에 표시될 값 */
    displayedValue?: string;
    /** 입력받은 값을 포맷팅하는 함수 formatValue */
    // eslint-disable-next-line no-unused-vars
    formatValue?: (value: string) => any;
    className?: string;
  };

const TextInput = ({
  name,
  placeholder,
  control,
  defaultValue,
  rules,
  className,
  ...inputProps
}: TextInputProps) => {
  const {
    field: { value, onChange, ...fieldProps },
  } = useController({ name, control, defaultValue, rules });
  return (
    <StyledInput
      {...inputProps}
      {...fieldProps}
      name={name}
      placeholder={placeholder}
      value={value ?? defaultValue}
      onChange={onChange}
      className={className}
    />
  );
};

export default TextInput;

const StyledInput = styled.input`
  width: 334px;
  height: 32px;
  border: 1px solid ${COLORS.grayA3A};
  border-radius: 0;
  padding-left: 5px;

  ::placeholder {
    font-size: 11px;
    font-weight: 300;
    color: ${COLORS.grayA3A};
  }
`;
