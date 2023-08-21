import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import React from 'react';

interface ReportListTemplateProps {
  data: any[];
  onClickItem: (id: number) => void | Promise<void>;
}

const ReportList = ({ data, onClickItem }: ReportListTemplateProps) => (
  <Wrapper>
    <Header>
      <Field>순위</Field>
      <Field>리포트 정보</Field>
      <Field>일정</Field>
      <Field>예산</Field>
    </Header>
    {data.map((d, idx) => (
      <Body key={d.index} onClick={() => onClickItem(d.index)}>
        <Data>
          <Text size={14} weight="700" color={COLORS.gray484}>
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
      </Body>
    ))}
  </Wrapper>
);

export default React.memo(ReportList);

/** ReportList Style */

const Wrapper = styled.div`
  width: 800px;
  background-color: ${COLORS.white};
  box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 150px 240px 240px 170px;
  border-bottom: 1px solid #e3ebfa;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 150px 240px 240px 170px;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Field = styled.div`
  height: 40px;
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
