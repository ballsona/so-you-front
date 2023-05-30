import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import { RegisterInputType, userType } from '@/types/user';
import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';

export interface RegisterTemplateProps {
  type: userType;
  onChangeInput: UseFormRegister<RegisterInputType>;
  onSubmitRegister: () => Promise<void>;
}

const RegisterTemplate = ({
  type,
  onChangeInput,
  onSubmitRegister,
}: RegisterTemplateProps) => {
  const isInfluencer = type === 'influencer';
  return (
    <TemplateWrapper>
      {/*<Text
          size={80}
          weight="800"
          color={COLORS.primary}
          className="logo-text"
        >
          SoYOU
        </Text>*/}
      <RegisterForm>
        <Text size={24} weight="700" color={COLORS.gray484} className="title">
          {isInfluencer ? '인플루언서' : '광고주'} 등록
        </Text>
        <RegisterInputWrap>
          <Label>이메일</Label>
          <Input
            type="email"
            {...onChangeInput('email')}
            className="email-input"
          />
          <MiniButton onClick={() => {}}>인증</MiniButton>
        </RegisterInputWrap>
        <RegisterInputWrap>
          <Label>패스워드</Label>
          <Input type="password" {...onChangeInput('password')} />
        </RegisterInputWrap>
        <RegisterInputWrap>
          <Label>이름</Label>
          <Input {...onChangeInput('name')} />
        </RegisterInputWrap>
        <RegisterInputWrap>
          <Label>생년월일</Label>
          <Input {...onChangeInput('birth_date')} />
        </RegisterInputWrap>

        {isInfluencer && (
          <>
            <RegisterInputWrap>
              <Label>카테고리</Label>
              <Input />
            </RegisterInputWrap>
            <RegisterInputWrap>
              <Label>예상광고비</Label>
              <Input {...onChangeInput('cost')} />
              {/*<MiniButton onClick={() => {}}>적용</MiniButton>*/}
            </RegisterInputWrap>
            <RegisterInputWrap>
              <Label>채널링크</Label>
              <Input {...onChangeInput('channel')} />
              {/*<MiniButton onClick={() => {}}>적용</MiniButton>*/}
            </RegisterInputWrap>
          </>
        )}
        <RegisterButtonsWrap>
          <Button onClick={() => {}} className="cancel-btn">
            뒤로
          </Button>
          <Button onClick={onSubmitRegister} className="submit-btn">
            등록하기
          </Button>
        </RegisterButtonsWrap>
      </RegisterForm>
    </TemplateWrapper>
  );
};

export default RegisterTemplate;

/** RegisterTemplate Style */

const TemplateWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterForm = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 44px;
  }
`;

const RegisterInputWrap = styled.div`
  display: flex;
  align-items: center;
  width: 450px;
  margin-bottom: 18px;

  .email-input {
    width: 250px;
  }
`;

const Label = styled.div`
  width: 100px;
  height: 32px;
  border-right: 3px solid ${COLORS.primary};
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
  margin-right: 16px;
`;

const Input = styled.input`
  width: 334px;
  height: 32px;
  border: 1px solid ${COLORS.grayA3A};
  border-radius: 0;
  padding-left: 5px;
`;

const MiniButton = styled.button`
  width: 80px;
  height: 32px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border-radius: 2px;
  margin-left: 4px;
`;

const RegisterButtonsWrap = styled.div`
  margin-top: 50px;
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
