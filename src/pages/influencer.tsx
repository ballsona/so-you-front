import { useState } from 'react';
import { useRecoilState } from 'recoil';

import NavigationBar from '@/components/common/NavigationBar';
import InfluencerRankTemplate from '@/components/InfluencerListTemplate';

import { InfluencerListData } from '../dummyData';
import { influencerInfoState } from '../stores/influencerAtom';
import InfluencerInfoModal from '@/components/common/InfluencerInfoModal';
import styled from '@emotion/styled';

const Influencer = () => {
  // 인플루언서 정보 모달 열림 여부
  const [isModalOpened, setIsModalOpened] = useState(false);
  // 모달에 전달할 인플루언서 정보를 전역 상태에 저장하는 함수
  const [influencerInfo, setFocusedInfluencerInfo] =
    useRecoilState(influencerInfoState);

  const handleModal = () => setIsModalOpened((prev) => !prev);

  const onClickInfluencerItem = (id: number) => {
    setFocusedInfluencerInfo(
      InfluencerListData.filter((i) => i.influencer_id === id)[0],
    );
    handleModal();
  };
  return (
    <>
      <NavigationBar activeTab="influencer" />
      {isModalOpened && (
        <ModalContainer>
          <InfluencerInfoModal handleModal={handleModal} />
        </ModalContainer>
      )}
      <InfluencerRankTemplate
        handleModal={handleModal}
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
