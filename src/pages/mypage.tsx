import { getTokenAsync, getUserTypeAsync } from '@/apis/auth';
import { getUserInfoAsync } from '@/apis/user';
import Layout from '@/components/common/Layout';
import MyPageTemplate from '@/components/user/MypageTemplate';
import { UserType } from '@/types/user';
import { withAuth } from '@/utils/withAuth';

interface MyPageProps {
  userType: UserType;
}

export const getServerSideProps = withAuth(async (ctx) => {
  const { accessToken } = await getTokenAsync();
  const res = await getUserInfoAsync();
  console.log(res, accessToken);
  return { props: { userType: 'influencer' } };
});

const MyPage = ({ userType }: MyPageProps) => {
  return (
    <Layout activeTab="mypage">
      <MyPageTemplate userType={userType} />
    </Layout>
  );
};

export default MyPage;
