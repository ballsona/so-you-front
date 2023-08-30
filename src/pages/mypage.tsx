import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import { withAuth } from '@/utils/withAuth';
import dynamic from 'next/dynamic';

const DynamicMyPage = dynamic(
  () => import('../components/user/MypageTemplate'),
  {
    loading: () => <div>loading..</div>,
    ssr: false,
  },
);

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

const MyPage = () => {
  return (
    <Layout activeTab="mypage">
      <DynamicMyPage />
    </Layout>
  );
};

export default MyPage;
