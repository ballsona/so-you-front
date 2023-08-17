import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import NavigationBar from '@/components/common/NavigationBar';
import InfluencerListTemplate from '@/components/influencer/InfluencerListTemplate';

import InfluencerInfoModal from '@/components/common/Modal/InfluencerInfoModal';
import styled from '@emotion/styled';
import { getInfluencerListAsync } from '@/apis/influencer';
import { focusedInfluencerData } from '@/stores/influencerState';

//export const getServerSideProps: GetServerSideProps<{
//  data: any;
//}> = async () => {
//  const res = await getInfluencerListAsync(token);
//  return { props: { data } };
//};

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
