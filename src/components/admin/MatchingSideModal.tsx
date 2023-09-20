import { useModal } from '@/hooks/useModal';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Text from '../common/Text';

const Row = ({ label, data }: { label: string; data: string }) => (
  <RowWrap>
    <Text size={14} weight="700" color="#484848">
      {label}
    </Text>
    <Text size={12} weight="400" color="#484848" className="content">
      {data}
    </Text>
  </RowWrap>
);

const BUTTON_LABEL = ['나에게 배정', '리포트 작성', '리포트 보기'];

const MatchingSideModal = ({ status, data, onClickButton }: any) => {
  const {
    modalState: { visible },
  } = useModal();
  const { client_name, channel_Title, category, cost, date } = data;
  return (
    <ModalWrapper
      animate={visible ? 'open' : 'closed'}
      initial={{ right: -230 }}
      variants={{
        open: { right: 0 },
        closed: { right: -230 },
      }}
    >
      <ContentWrap>
        <Row label="광고주" data={client_name} />
        <Row label="인플루언서" data={channel_Title} />
        <Row label="카테고리" data={JSON.parse(category).join(', ')} />
        <Row label="금액" data={cost} />
        <Row label="시기" data={date} />
      </ContentWrap>
      <Text
        size={14}
        weight="700"
        color="#484848"
        onClick={onClickButton}
        className="side-button"
      >
        {BUTTON_LABEL[status - 1]}
      </Text>
    </ModalWrapper>
  );
};

export default MatchingSideModal;

const ModalWrapper = styled(motion.div)`
  width: 230px;
  height: 100vh;
  border-left: 1px solid #e5e5e5;
  background-color: #fcfcfc;
  position: fixed;
  top: 0;
  right: 0;

  .side-button {
    position: absolute;
    left: 25px;
    bottom: 100px;
    cursor: pointer;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 7px;
  margin-top: 174px;
  margin-left: 25px;
`;

const RowWrap = styled.div`
  display: grid;
  grid-template-columns: 70px 100px;

  align-items: flex-start;
  justify-content: center;
  gap: 15px;

  .content {
    word-break: normal;
  }
`;
