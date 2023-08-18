import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import React from 'react';

interface ReportListTemplateProps {
  data: any[];
  onClickItem: (id: number) => void | Promise<void>;
}

const ReportList = ({ data, onClickItem }: ReportListTemplateProps) => (
  <>
    <TableHeader>
      <Field>순위</Field>
      <Field>리포트 정보</Field>
      <Field>일정</Field>
      <Field>예산</Field>
    </TableHeader>
    {data.map((d, idx) => (
      <TableBody key={d.index} onClick={() => onClickItem(d.index)}>
        <Data>
          <Text size={14} color={COLORS.gray484}>
            {idx + 1}
          </Text>
        </Data>
        <Data>
          <Text
            size={14}
            weight="500"
            color={COLORS.gray484}
            className="channel-title"
          >
            {d.title}
          </Text>
        </Data>
        <Data>
          <Text size={14} weight="500" color="#547AC3">
            {d.date}
          </Text>
        </Data>
        <Data>
          <Text size={14} color={COLORS.gray484}>
            {d.cost}원
          </Text>
        </Data>
      </TableBody>
    ))}
  </>
);

export default React.memo(ReportList);

/** ReportList Style */

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
