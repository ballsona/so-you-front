import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import NavigationBar from '@/components/common/NavigationBar';
import InfluencerListTemplate from '@/components/InfluencerListTemplate';

import InfluencerInfoModal from '@/components/common/InfluencerInfoModal';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { getInfluencerListAsync } from '@/apis/influencer';
import { tokenAtom } from '@/stores/userState';
import { focusedInfluencerData } from '@/stores/influencerState';
import { InfluencerListData } from '../../dummyData';

//export const getServerSideProps: GetServerSideProps<{
//  data: any;
//}> = async () => {
//  const res = await getInfluencerListAsync(token);
//  return { props: { data } };
//};

const Influencer = () => {
  // 인플루언서 리스트 데이터
  const [data, setData] = useState([]);

  // 인플루언서 정보 모달 열림 여부
  const [isModalOpened, setIsModalOpened] = useState(false);
  // 모달에 전달할 인플루언서 정보를 전역 상태에 저장하는 함수
  const [, setFocusedInfluencerInfo] = useRecoilState(focusedInfluencerData);
  const { token } = useRecoilValue(tokenAtom);

  const handleModal = () => setIsModalOpened((prev) => !prev);

  const onClickInfluencerItem = (index: number) => {
    setFocusedInfluencerInfo(data.filter((i: any) => i.index === index)[0]);
    handleModal();
  };

  useEffect(() => {
    const getInfluencerList = async () => {
      const res = await getInfluencerListAsync(token);
      if (res.isSuccess) {
        setData(res.result.response);
      }
    };

    getInfluencerList();
  }, []);

  return (
    <>
      <NavigationBar activeTab="influencer" />
      {isModalOpened && (
        <ModalContainer>
          <InfluencerInfoModal handleModal={handleModal} />
        </ModalContainer>
      )}
      <InfluencerListTemplate
        data={data}
        onClickInfluencerItem={onClickInfluencerItem}
      />
    </>
  );
};

export default Influencer;

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background: transparent;
`;
