import styled from '@emotion/styled';
import InfluencerList from '../common/InfluencerList';
import { useEffect, useState } from 'react';
import { getMatchingInfluencerListAsync } from '@/apis/project';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenAtom } from '@/stores/userState';
import { projectRequestData } from '@/stores/projectState';
import { focusedInfluencerData } from '@/stores/influencerState';
import InfluencerInfoModal from '../common/InfluencerInfoModal';

interface InfluencerSelectFormProps {}

const InfluencerSelectForm = ({}: InfluencerSelectFormProps) => {
  const [data, setData] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleModal = () => setIsModalOpened((prev) => !prev);

  const [, setFocusedInfluencerInfo] = useRecoilState(focusedInfluencerData);
  const { token } = useRecoilValue(tokenAtom);
  const { popularity, costRange, category } =
    useRecoilValue(projectRequestData);

  useEffect(() => {
    const getMatchingInfluencerList = async () => {
      const res = await getMatchingInfluencerListAsync(
        token,
        popularity,
        costRange,
        category,
      );
      if (res.isSuccess) {
        setData(res.result.response);
      }
    };

    getMatchingInfluencerList();
  }, []);

  const onClickInfluencerItem = (id: number) => {
    setFocusedInfluencerInfo(data.filter((i: any) => i.index === id)[0]);
    handleModal();
  };

  return (
    <Wrapper>
      {isModalOpened && (
        <ModalContainer>
          <InfluencerInfoModal handleModal={handleModal} />
        </ModalContainer>
      )}
      <InfluencerList
        data={data}
        onClickInfluencerItem={onClickInfluencerItem}
      />
    </Wrapper>
  );
};

export default InfluencerSelectForm;

const Wrapper = styled.div``;

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background: transparent;
`;
