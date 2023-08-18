import NavigationBar from '@/components/common/NavigationBar';
import { useRouter } from 'next/router';
import InfluencerDetailTemplate from '@/components/influencer/InfluencerDetailTemplate';
import { useEffect, useState } from 'react';
import {
  getInfluencerDetailInfoAsync,
  getStatisticsInfoAsync,
} from '@/apis/influencer';

const InfluencerDetail = () => {
  const router = useRouter();
  const id = Number(router.query.id as string);

  const [data, setData] = useState();

  useEffect(() => {
    const getDetailData = async () => {
      const res1 = await getInfluencerDetailInfoAsync(id);
      const res2 = await getStatisticsInfoAsync(id);
      if (res1.isSuccess && res2.isSuccess) {
        setData({ ...res1.result.response, ...res2.result.response.userData });
      }
    };

    if (id) getDetailData();
  }, [id]);

  if (!data) return;

  return (
    <>
      <NavigationBar activeTab="influencer" />
      <InfluencerDetailTemplate data={data} />
    </>
  );
};

export default InfluencerDetail;
