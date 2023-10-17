import Layout from '@/components/common/Layout';
import { withAuth } from '@/utils/withAuth';
import { useRouter } from 'next/router';
import InfluencerSearchTemplate from '@/components/influencer/InfluencerSearchTemplate';
import { useRecoilValue } from 'recoil';
import { searchResult } from '@/stores/influencerState';

export const getServerSideProps = withAuth(async (ctx) => ({ props: {} }));

const Search = () => {
  const router = useRouter();

  const keyword = router.query.keyword as string;
  const data = useRecoilValue(searchResult);

  return (
    <Layout activeTab="influencer">
      <InfluencerSearchTemplate keyword={keyword} data={data} />
    </Layout>
  );
};

export default Search;
