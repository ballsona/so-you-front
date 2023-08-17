import styled from '@emotion/styled';
import { COLORS } from '@/styles/theme';
import Text from '@/components/common/Text';
import CloseIcon from '@/assets/icon/close.svg';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';

interface InfluencerSelectModalProps {
  info: any;
  onSelectItem: () => Promise<void>;
}

const InfluencerSelectModal = ({
  info,
  onSelectItem,
}: InfluencerSelectModalProps) => {
  const { closeModal } = useModal();

  return (
    <ModalWrapper>
      <CloseIcon className="close-icon" onClick={closeModal} />
      <ProfileWrap>
        <Image
          src={info?.channel_Image}
          alt="channel-img"
          className="channel-img"
          width="80"
          height="80"
        />
        <Text size={18} weight="700" color={COLORS.gray484}>
          {info?.channel_Title}
        </Text>
        <Text size={14} color={COLORS.gray818}>
          {info?.followersCount}명 구독
        </Text>
      </ProfileWrap>
      <DetailInfoWrap>
        <Field>금액</Field>
        <Data>{info?.cost}원</Data>
        <Field>카테고리</Field>
        <Data>{JSON.parse(info?.category).join(', ')}</Data>
        <Field>사용채널</Field>
        <Data>인스타그램, 유튜브</Data>
      </DetailInfoWrap>
      <ButtonsWrap>
        <Button className="cancel-btn" onClick={closeModal}>
          취소
        </Button>
        <Button className="select-btn" onClick={onSelectItem}>
          선택하기
        </Button>
      </ButtonsWrap>
    </ModalWrapper>
  );
};

export default InfluencerSelectModal;

/** InfluencerSelectModal Style */

const ModalWrapper = styled.div`
  width: 360px;
  height: 400px;
  background-color: ${COLORS.white};
  box-shadow: 0px 0px 5px rgba(136, 136, 136, 0.23);
  border-radius: 8px;
  padding-top: 30px;
  overflow: hidden;

  position: relative;
  top: calc(50% - 160px);
  left: 70%;

  .close-icon {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
  }
`;

const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;

  .cancel-btn {
    width: 140px;
    background-color: ${COLORS.gray484};
  }

  .select-btn {
    width: 220px;
    background-color: ${COLORS.primary};
  }
`;

const Button = styled.button`
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  color: ${COLORS.white};
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .channel-img {
    border-radius: 40px;
    background-color: #f6f6f6;
    border: 1px solid #cdcdcd;
    margin-bottom: 18px;
  }
`;

const DetailInfoWrap = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 96px 134px;
  gap: 2px;
  margin-top: 33px;
`;

const Field = styled.div`
  font-size: 14px;
  line-height: 25px;
  height: 25px;
  font-weight: 700;
  color: ${COLORS.gray484};
`;

const Data = styled.div`
  font-size: 14px;
  line-height: 25px;
  height: 25px;
  font-weight: 400;
  color: ${COLORS.primary};
`;
