import Image from 'next/image';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { COLORS } from '@/styles/theme';
import { UserType } from '@/types/user';
import Text from '@/components/common/Text';
import RegisterForm from './RegisterForm';
import RegisterSide from '@/assets/image/register-side-img.jpg';

export interface RegisterTemplateProps {
  type: UserType;
}

const RegisterTemplate = ({ type }: RegisterTemplateProps) => {
  const router = useRouter();
  const userType = type === 'influencer' ? '인플루언서' : '광고주';

  return (
    <TemplateWrapper>
      <Text
        size={25}
        weight="700"
        color={COLORS.white}
        className="logo-text"
        onClick={() => router.push('/')}
      >
        SoYOU
      </Text>
      <SideImageWrap>
        <Image src={RegisterSide} layout="fill" />
      </SideImageWrap>
      <FormWrap>
        <Text size={24} weight="700" color={COLORS.gray484} className="title">
          {userType} 등록
        </Text>
        <Hr />
        <RegisterForm type={type} />
      </FormWrap>
    </TemplateWrapper>
  );
};

export default RegisterTemplate;

/** RegisterTemplate Style */

const TemplateWrapper = styled.div`
  height: 100vh;
  display: flex;
  gap: 90px;

  .logo-text {
    position: absolute;
    top: 25px;
    left: 21px;
    z-index: 10;
    cursor: pointer;
  }
`;

const SideImageWrap = styled.div`
  width: 357px;
  height: 100vh;
  position: relative;
`;

const FormWrap = styled.div`
  width: 500px;
  margin-top: 81px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin: 18px 0px 55px;
`;
