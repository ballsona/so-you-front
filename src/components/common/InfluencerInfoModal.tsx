import styled from '@emotion/styled';
import { COLORS } from '@/styles/theme';
import { useRecoilValue } from 'recoil';
import { focusedInfluencerData } from '@/stores/influencerState';

import Text from './Text';
import CloseIcon from '@/assets/icon/close.svg';
import { useRouter } from 'next/router';

interface InfluencerInfoModalProps {
  handleModal: () => void;
}

const InfluencerInfoModal = ({ handleModal }: InfluencerInfoModalProps) => {
  const router = useRouter();
  const info = useRecoilValue(focusedInfluencerData);

  return (
    <ModalWrapper>
      <CloseIcon className="close-icon" onClick={handleModal} />

      <ProfileWrap>
        <ProfileImg />
        <Text size={18} weight="700" color={COLORS.gray484}>
          {info?.name}
        </Text>
        <Text size={14} color={COLORS.gray818}>
          {info?.followersCount}명 구독
        </Text>
      </ProfileWrap>

      <DetailInfoWrap>
        <Field>소요기간</Field>
        <Data>{info?.working_time}일</Data>
        <Field>금액</Field>
        <Data>{info?.cost}원</Data>
        <Field>카테고리</Field>
        <Data>{info?.category.join(', ')}</Data>
        <Field>사용채널</Field>
        <Data>인스타그램, 유투브</Data>
      </DetailInfoWrap>

      <ModalButtonsWrap>
        <Button
          className="match-btn"
          onClick={() => alert('매칭 기능은 준비중이에요☺️')}
        >
          매칭
        </Button>
        <Button
          className="details-btn"
          onClick={() => router.push(`/influencer/${info?.influencer_id}`)}
        >
          상세보기
        </Button>
      </ModalButtonsWrap>
    </ModalWrapper>
  );
};

export default InfluencerInfoModal;

/** InfluencerInfoModal Style */

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

const ModalButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;

  .match-btn {
    width: 220px;
    background-color: ${COLORS.gray484};
  }

  .details-btn {
    width: 140px;
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
`;

const ProfileImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #f6f6f6;
  border: 1px solid #cdcdcd;
  margin-bottom: 18px;
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
