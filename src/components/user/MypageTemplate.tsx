import { UserType } from '@/types/user';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { getUserInfoAsync } from '@/apis/user';
import { useRouter } from 'next/router';
import Text from '../common/Text';
import MyPageForm from './MyPageForm';

interface MyPageTemplateProps {
  userType: UserType;
}

const MyPageTemplate = ({ userType }: MyPageTemplateProps) => {
  const router = useRouter();
  const [data, setData] = useState<object>();

  // 유저 정보 데이터 불러오기
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserInfoAsync();
      if (res.isSuccess) {
        setData(res.result.user);
      }
    };
    getUserInfo();
  }, []);

  if (!data) return <>데이터가 존재하지 않습니다.</>;

  return (
    userType && (
      <TemplateWrapper>
        <Text size={24} weight="700" color={COLORS.gray484} className="title">
          마이페이지
        </Text>
        <MyPageForm type={userType} defaultData={data} />
      </TemplateWrapper>
    )
  );
};

export default MyPageTemplate;

const TemplateWrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - 188px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .title {
    margin: 0 auto 44px;
  }
`;
