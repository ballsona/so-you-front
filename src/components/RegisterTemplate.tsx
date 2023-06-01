import styled from '@emotion/styled';
import { MutableRefObject } from 'react';
import { useRouter } from 'next/router';
import { UseFormRegister } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { COLORS } from '@/styles/theme';
import { emailVerifyCodeAtom, emailVerifyStatusAtom } from '@/stores/userAtom';
import { RegisterInputType, userType } from '@/types/user';
import Text from '@/components/common/Text';
import AppLogo from '@/assets/icon/app-logo.svg';
import { ThemeType } from '@/constants/influencer';
import CategoryTag from './common/CategoryTag';

const EMAIL_BTN_LABEL = ['인증', '확인', '인증 완료'];

type PE = HTMLParagraphElement;
export interface RegisterTemplateProps {
  type: userType;
  messageRefs: MutableRefObject<PE[]>;
  categoryList: Array<ThemeType>;
  handleModal: () => void;
  onChangeInput: UseFormRegister<RegisterInputType>;
  onVerifyEmail: () => Promise<void>;
  onSubmitRegister: () => Promise<void>;
}

const RegisterTemplate = ({
  type,
  messageRefs,
  categoryList,
  handleModal,
  onChangeInput,
  onVerifyEmail,
  onSubmitRegister,
}: RegisterTemplateProps) => {
  const router = useRouter();
  const userType = type === 'influencer' ? '인플루언서' : '광고주';

  const emailVerifyStatus = useRecoilValue(emailVerifyStatusAtom);
  const [emailVerifyCode, setEmailVerifyCode] =
    useRecoilState(emailVerifyCodeAtom);

  const onChangeVerifyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailVerifyCode(e.target.value);
  };

  return (
    <TemplateWrapper>
      <AppLogo className="app-logo" onClick={() => router.push('/')} />
      <RegisterForm>
        <Text size={24} weight="700" color={COLORS.gray484} className="title">
          {userType} 등록
        </Text>
        <MessageBox ref={(node: PE) => (messageRefs.current[0] = node)} />
        <RegisterInputWrap>
          <Label>이메일</Label>
          <Input
            type="email"
            placeholder={'이메일을 입력해주세요'}
            className="email-input"
            disabled={emailVerifyStatus === 3}
            {...onChangeInput('email')}
          />
          {emailVerifyStatus === 2 && (
            <Input
              placeholder="인증코드"
              className="code-input"
              value={emailVerifyCode}
              onChange={onChangeVerifyCode}
            />
          )}
          <MiniButton
            onClick={onVerifyEmail}
            className={emailVerifyStatus === 3 ? 'verified-btn' : ''}
          >
            {EMAIL_BTN_LABEL[emailVerifyStatus - 1]}
          </MiniButton>
        </RegisterInputWrap>
        <MessageBox ref={(node: PE) => (messageRefs.current[1] = node)} />
        <RegisterInputWrap>
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="숫자, 영문 포함 8글자 이상"
            {...onChangeInput('password')}
          />
        </RegisterInputWrap>
        <MessageBox ref={(node: PE) => (messageRefs.current[2] = node)} />
        <RegisterInputWrap>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            className="password-check-input"
            {...onChangeInput('passwordCheck')}
          />
        </RegisterInputWrap>

        <RegisterInputWrap>
          <Label>이름</Label>
          <Input
            placeholder={`${userType}님의 이름을 입력해주세요`}
            {...onChangeInput('name')}
          />
        </RegisterInputWrap>
        <MessageBox ref={(node: PE) => (messageRefs.current[3] = node)} />
        <RegisterInputWrap>
          <Label>생년월일</Label>
          <Input
            placeholder={`${userType}님의 생년월일을 입력해주세요 (YYYY-MM-DD)`}
            {...onChangeInput('birth_date')}
          />
        </RegisterInputWrap>

        {type === 'influencer' && (
          <>
            <RegisterInputWrap className="category-row">
              <Label>카테고리</Label>
              {categoryList?.map((category) => (
                <CategoryTag key={category} theme={category} />
              ))}
              <MiniButton onClick={handleModal}>
                {categoryList.length > 0 ? '수정' : '추가'}
              </MiniButton>
            </RegisterInputWrap>
            <MessageBox ref={(node: PE) => (messageRefs.current[4] = node)} />
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
                placeholder="연결할 유튜브 링크를 등록해주세요"
                {...onChangeInput('channel')}
              />
            </RegisterInputWrap>
          </>
        )}

        <RegisterButtonsWrap>
          <Button onClick={() => router.back()} className="cancel-btn">
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
  position: relative;

  .app-logo {
    position: absolute;
    top: 25px;
    left: 21px;
    cursor: pointer;
  }
`;

const RegisterForm = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .title {
    margin: 0 auto 44px;
  }

  .category-row {
    width: 1000px;
  }
`;

const RegisterInputWrap = styled.div`
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

const Input = styled.input`
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

const MiniButton = styled.button`
  width: 80px;
  height: 32px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border-radius: 2px;
  margin-left: 4px;
`;

const RegisterButtonsWrap = styled.div`
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
