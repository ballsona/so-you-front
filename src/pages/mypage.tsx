import Layout from '@/components/common/Layout';
import MyPageTemplate from '@/components/user/MypageTemplate';
import { UserType } from '@/types/user';
import { withAuth } from '@/utils/withAuth';

interface MyPageProps {
  userType: UserType;
}

export const getServerSideProps = withAuth(async (ctx) => {
  const { cookies } = ctx.req;
  const { userType } = cookies;

  return { props: { userType } };
});

const MyPage = ({ userType }: MyPageProps) => (
  <Layout activeTab="mypage">
    <MyPageTemplate userType={userType} />
  </Layout>
);

export default MyPage;
