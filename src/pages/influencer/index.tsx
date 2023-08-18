import { useEffect, useState } from 'react';
import NavigationBar from '@/components/common/NavigationBar';
import InfluencerListTemplate from '@/components/influencer/InfluencerListTemplate';
import { getInfluencerListAsync } from '@/apis/influencer';

const Influencer = () => {
  // 인플루언서 리스트 데이터
  const [data, setData] = useState([]);

  // 인플루언서 리스트 데이터 호출
  useEffect(() => {
    const getInfluencerList = async () => {
      const res = await getInfluencerListAsync();
      if (res.isSuccess) {
        setData(res.result.response);
      }
    };

    getInfluencerList();
  }, []);

  return (
    <>
      <NavigationBar activeTab="influencer" />
      <InfluencerListTemplate data={data} />
    </>
  );
};

export default Influencer;
