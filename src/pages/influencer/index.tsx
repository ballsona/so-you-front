import { useEffect, useState } from 'react';
import InfluencerListTemplate from '@/components/influencer/InfluencerListTemplate';
import { getInfluencerListAsync } from '@/apis/influencer';
import Layout from '@/components/common/Layout';
import { withAuth } from '@/utils/withAuth';

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

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
    <Layout activeTab="influencer">
      <InfluencerListTemplate data={data} />
    </Layout>
  );
};

export default Influencer;
