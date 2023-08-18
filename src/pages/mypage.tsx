import NavigationBar from '@/components/common/NavigationBar';
import dynamic from 'next/dynamic';

//export const getServerSideProps: GetServerSideProps<{
//  data: any;
//}> = async () => {
//  const res = await getInfluencerListAsync(token);
//  return { props: { data } };
//  w;
//};

const DynamicMyPage = dynamic(
  () => import('../components/user/MypageTemplate'),
  {
    loading: () => <div>loading..</div>,
    ssr: false,
  },
);

const MyPage = () => {
  return (
    <>
      <NavigationBar activeTab="mypage" />
      <DynamicMyPage />
    </>
  );
};

export default MyPage;
