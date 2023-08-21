import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import dynamic from 'next/dynamic';

const DynamicMyPage = dynamic(
  () => import('../components/user/MypageTemplate'),
  {
    loading: () => <div>loading..</div>,
    ssr: false,
  },
);

const MyPage = () => {
  return (
    <Layout activeTab="mypage">
      <DynamicMyPage />
    </Layout>
  );
};

export default MyPage;
