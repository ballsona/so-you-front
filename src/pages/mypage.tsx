import { getUserInfoAsync } from '@/apis/user';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MyPageTemplate from '@/components/user/MypageTemplate';
import { useRecoilValue } from 'recoil';
import { userTypeAtom } from '@/stores/userState';
import { userType } from '@/types/user';
import NavigationBar from '@/components/common/NavigationBar';

//export const getServerSideProps: GetServerSideProps<{
//  data: any;
//}> = async () => {
//  const res = await getInfluencerListAsync(token);
//  return { props: { data } };
//  w;
//};

const MyPage = () => {
  const router = useRouter();
  const [data, setData] = useState({});

  const userType = useRecoilValue(userTypeAtom);
  console.log(data, '?');

  // 유저 정보 데이터 불러오기
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserInfoAsync();
      if (res.isSuccess) {
        setData(res.result.user);
      }
    };

    getUserInfo();
  }, [userType]);

  if (!userType) {
    //router.push('/user/login');
    return null;
  }

  return (
    <>
      <NavigationBar activeTab="mypage" />
      <MyPageTemplate type={userType} data={data} />;
    </>
  );
};

export default MyPage;
