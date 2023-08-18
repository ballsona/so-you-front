import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';

// TODO 데이터 전역 상태로 변경
interface InfluencerListTemplateProps {
  data: any[];
  onClickItem: (id: number) => void | Promise<void>;
}

const InfluencerList = ({ data, onClickItem }: InfluencerListTemplateProps) => (
  <>
    <TableHeader>
      <Field>순위</Field>
      <Field>프로필 정보</Field>
      <Field>카테고리</Field>
      <Field>예산</Field>
    </TableHeader>
    {data.map((inf, idx) => (
      <TableBody key={inf.index} onClick={() => onClickItem(inf.index)}>
        <Data>
          <Text size={14} color={COLORS.gray484}>
            {idx + 1}
          </Text>
        </Data>
        <Data className="profile-data">
          <ProfileWrap>
            {(inf.channel_Image || inf.channel_image) && (
              <Image
                src={inf.channel_Image ?? inf.channel_image}
                layout="fill"
                style={{ borderRadius: 20 }}
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
              {inf.channel_Title ?? inf.channel_title}
            </Text>
            <Text size={12} color={COLORS.gray818}>
              {inf.followersCount}명 구독
            </Text>
          </ProfileTextWrap>
        </Data>
        <Data>
          <Text size={14} weight="700" color="#547AC3">
            {inf.category ? JSON.parse(inf.category).join(', ') : ''}
          </Text>
        </Data>
        <Data>
          <Text size={14} color={COLORS.gray484}>
            {inf.cost &&
              inf.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </Text>
        </Data>
      </TableBody>
    ))}
  </>
);

export default React.memo(InfluencerList);

/** InfluencerList Style */

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 150px 240px 240px 170px;

  .profile-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const TableBody = styled.div`
  display: grid;
  grid-template-columns: 150px 240px 240px 170px;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Field = styled.div`
  height: 40px;
  border-top: 1px solid ${COLORS.primary};
  border-bottom: 1px solid ${COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.primary};
`;

const Data = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f6f6f6;
  border: 1px solid #cdcdcd;
  margin-right: 16px;
  position: relative;
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
