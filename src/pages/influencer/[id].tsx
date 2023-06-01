import NavigationBar from '@/components/common/NavigationBar';
import { useRouter } from 'next/router';
import { InfluencerDetailInfoData } from '../../dummyData';
import InfluencerDetailTemplate from '@/components/InfluencerDetailTemplate';

const InfluencerDetail = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <NavigationBar activeTab="influencer" />
      <InfluencerDetailTemplate info={InfluencerDetailInfoData} />
    </>
  );
};

export default InfluencerDetail;

/** InfluencerDetail Style */
