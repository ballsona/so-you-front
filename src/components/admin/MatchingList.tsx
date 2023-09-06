import styled from '@emotion/styled';
import ToggleButton from './ToggleButton';
import Text from '../common/Text';
import { COLORS } from '@/styles/theme';
import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import MatchingSideModal from './MatchingSideModal';
import CreateReportModal from './CreateReportModal';
import { useRouter } from 'next/router';
import { getUserInfoAsync } from '@/apis/user';
import { updateMatchingAsync } from '@/apis/admin';

const MatchingList = ({ activeStatus, data }: any) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const handleMatching = async (id: number) => {
    const userRes = await getUserInfoAsync();
    if (!userRes.isSuccess) {
      alert('매칭을 배정할 수 없습니다.');
      return;
    }
    const { email } = userRes.result.user;

    const res = await updateMatchingAsync(id, email);
    if (!res.isSuccess) {
      alert('매칭을 배정할 수 없습니다.');
      return;
    }

    alert('해당 매칭을 관리자님께 배정하였습니다.');
    router.reload();
  };

  const onSideButtonClick = (matchingId: number) => {
    closeModal();

    switch (activeStatus) {
      // 나에게 배정
      case 1: {
        handleMatching(matchingId);
        return;
      }
      // 리포트 작성
      case 2: {
        openModal(<CreateReportModal id={matchingId} />);
        return;
      }
      // 리포트 보기
      case 3: {
        router.push(`/report/${matchingId}`);
        return;
      }
      default:
        return;
    }
  };

  const onClickItem = (d: any) => {
    openModal(
      <MatchingSideModal
        status={activeStatus}
        data={d}
        onClickButton={() => onSideButtonClick(d.num)}
      />,
    );
  };
  return (
    <>
      {data?.map((d: any) => (
        <TableBody key={d.index} onClick={() => onClickItem(d)}>
          <Data>
            <Text size={14} color={COLORS.gray484}>
              {d.client_name}
            </Text>
          </Data>
          <Data className="profile-data">
            <ProfileWrap>
              {d.channel_Image && (
                <Image
                  src={d.channel_Image}
                  width="40"
                  height="40"
                  className="channel-img"
                />
              )}
            </ProfileWrap>
            <ProfileTextWrap>
              <Text
                size={14}
                weight="700"
                color={COLORS.gray484}
                className="channel-title"
              >
                {d.channel_Title ?? d.channel_title}
              </Text>
            </ProfileTextWrap>
          </Data>
          <Data>
            <Text size={14} weight="700" color="#547AC3">
              {JSON.parse(d.category).join(', ')}
            </Text>
          </Data>
          <Data>
            <Text size={14} color={COLORS.gray484}>
              {d.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </Text>
          </Data>
        </TableBody>
      ))}
    </>
  );
};

export default MatchingList;

const TableBody = styled.div`
  display: grid;
  grid-template-columns: 140px 220px 220px 140px;
  background-color: #ffff;
  box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  :hover {
    background-color: #f7f7f7;
  }
`;

const Data = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileWrap = styled.div`
  margin-right: 16px;

  .channel-img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #f6f6f6;
    border: 1px solid #cdcdcd;
  }
`;

const ProfileTextWrap = styled.div`
  width: 130px;

  .channel-title {
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
