import { useRouter } from 'next/router';
import InfluencerDetailTemplate from '@/components/influencer/InfluencerDetailTemplate';
import { useEffect, useState } from 'react';
import {
  getInfluencerDetailInfoAsync,
  getStatisticsInfoAsync,
} from '@/apis/influencer';
import Layout from '@/components/common/Layout';
import { withAuth } from '@/utils/withAuth';

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

const InfluencerDetail = () => {
  const router = useRouter();
  const id = Number(router.query.id as string);

  const [data, setData] = useState();

  useEffect(() => {
    const getDetailData = async () => {
      const [res1, res2] = await Promise.all([
        await getInfluencerDetailInfoAsync(id),
        await getStatisticsInfoAsync(id),
      ]);
      if (res1.isSuccess && res2.isSuccess) {
        setData({ ...res1.result.response, ...res2.result.response.userData });
      }
    };

    if (id) getDetailData();
  }, [id]);

  if (!data) return;

  return (
    <Layout activeTab="influencer">
      <InfluencerDetailTemplate data={data} />
    </Layout>
  );
};

export default InfluencerDetail;
