import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text from '../common/Text';

const ManagerModal = ({ onClickButton, managerInfo }: any) => (
  // const { image, name, category } = managerInfo;

  <ModalWrapper>
    <ProfileWrap>
      <Image
        src=""
        alt="profile-img"
        className="profile-img"
        width="80"
        height="80"
      />
      <Text size={18} weight="700" color={COLORS.gray484}>
        담당자
      </Text>
      <Text size={14} color={COLORS.gray818}>
        홍길동
      </Text>
    </ProfileWrap>
    <DetailInfoWrap>
      <Field>카테고리</Field>
      {/* <Data>{JSON.parse(category ?? '').join(', ') }</Data> */}
      <Data>식품</Data>
    </DetailInfoWrap>
    <Button onClick={onClickButton}>확인</Button>
  </ModalWrapper>
);
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

const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  color: ${COLORS.white};
  background-color: ${COLORS.primary};
  position: absolute;
  bottom: 0;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .profile-img {
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
  margin-top: 40px;
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
