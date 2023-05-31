import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import { RegisterInputType, userType } from '@/types/user';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { UseFormRegister } from 'react-hook-form';

export interface RegisterTemplateProps {
  type: userType;
  handleModal: () => void;
  onChangeInput: UseFormRegister<RegisterInputType>;
  onSubmitRegister: () => Promise<void>;
}

const RegisterTemplate = ({
  type,
  handleModal,
  onChangeInput,
  onSubmitRegister,
}: RegisterTemplateProps) => {
  const router = useRouter();
  const onMoveBack = () => router.back();

  const userType = type === 'influencer' ? '인플루언서' : '광고주';

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
          {userType} 등록
        </Text>
        <RegisterInputWrap>
          <Label>이메일</Label>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="email-input"
            {...onChangeInput('email')}
          />
          <MiniButton onClick={() => {}}>인증</MiniButton>
        </RegisterInputWrap>
        <RegisterInputWrap>
          <Label>패스워드</Label>
          <Input
            type="password"
            placeholder="숫자, 영문 포함 8글자 이상"
            {...onChangeInput('password')}
          />
        </RegisterInputWrap>
        <RegisterInputWrap>
          <Label>패스워드 확인</Label>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            className="password-check-input"
            {...onChangeInput('passwordCheck')}
          />
          <MiniButton onClick={() => {}} className="password-check-btn">
            비밀번호 확인
          </MiniButton>
        </RegisterInputWrap>
        <RegisterInputWrap>
          <Label>이름</Label>
          <Input
            placeholder={`${userType}님의 이름을 입력해주세요.`}
            {...onChangeInput('name')}
          />
        </RegisterInputWrap>
        <RegisterInputWrap>
          <Label>생년월일</Label>
          <Input
            placeholder={`${userType}님의 생년월일을 입력해주세요.`}
            {...onChangeInput('birth_date')}
          />
        </RegisterInputWrap>

        {type === 'influencer' && (
          <>
            <RegisterInputWrap>
              <Label>카테고리</Label>
              <MiniButton onClick={handleModal}>추가</MiniButton>
            </RegisterInputWrap>
            <RegisterInputWrap>
              <Label>예상 광고비</Label>
              <Input
                placeholder="예상 광고비를 입력해주세요"
                {...onChangeInput('cost')}
              />
            </RegisterInputWrap>
            <RegisterInputWrap>
              <Label>채널 링크</Label>
              <Input
                placeholder="연결할 유투브 링크를 등록해주세요"
                {...onChangeInput('channel')}
              />
            </RegisterInputWrap>
          </>
        )}

        <RegisterButtonsWrap>
          <Button onClick={onMoveBack} className="cancel-btn">
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

  .password-check-input {
    width: 220px;
  }
  .password-check-btn {
    width: 114px;
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

const Input = styled.input`
  width: 334px;
  height: 32px;
  border: 1px solid ${COLORS.grayA3A};
  border-radius: 0;
  padding-left: 5px;

  ::placeholder {
    font-size: 11px;
    font-weight: 300;
    color: ${COLORS.grayC4C};
  }
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
