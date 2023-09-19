import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text from '../Text';

interface ManagerModalProps {
  managerInfo: {
    // image: string;
    name: string;
    position: string;
    phoneNumber: string;
    email: string;
  };
  onCancel: () => void;
  onConfirm: () => void;
}

const ManagerModal = ({
  onCancel,
  onConfirm,
  managerInfo,
}: ManagerModalProps) => {
  const { name, position, phoneNumber, email } = managerInfo;
  return (
    <ModalWrapper>
      <ProfileWrap>
        <Image
          src="/user-profile.svg"
          alt="profile-img"
          className="profile-img"
          width="120"
          height="120"
        />
        <Text size={18} weight="700" color={COLORS.gray484} className="name">
          담당자
        </Text>
        <Text size={14} color={COLORS.gray818}>
          {name}
        </Text>
      </ProfileWrap>
      <DetailInfoWrap>
        <Field>직책</Field>
        <Data>{position}</Data>
        <Field>연락처</Field>
        <Data>{phoneNumber}</Data>
        <Field>이메일</Field>
        <Data>{email}</Data>
      </DetailInfoWrap>
      <ButtonsWrap>
        <Button className="cancel-btn" onClick={onCancel}>
          뒤로
        </Button>
        <Button className="confirm-btn" onClick={onConfirm}>
          확인
        </Button>
      </ButtonsWrap>
    </ModalWrapper>
  );
};
export default ManagerModal;

const ModalWrapper = styled.div`
  width: 360px;
  height: 400px;
  background-color: ${COLORS.white};
  box-shadow: 0px 0px 5px rgba(136, 136, 136, 0.23);
  border-radius: 8px;
  padding-top: 30px;
  overflow: hidden;

  position: relative;
  top: calc(50% - 200px);
  left: calc(50% - 180px);
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .name {
    margin: 11px 0px 5px;
  }
`;

const DetailInfoWrap = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 96px 134px;
  gap: 2px;
  margin-top: 20px;
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

const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;

  .cancel-btn {
    width: 160px;
    background-color: ${COLORS.gray484};
  }

  .confirm-btn {
    width: 200px;
    background-color: ${COLORS.primary};
  }
`;

const Button = styled.button`
  height: 60px;
  font-size: 16px;
  font-weight: 700;
  color: ${COLORS.white};
`;
