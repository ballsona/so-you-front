import styled from '@emotion/styled';
import Text from '../common/Text';
import { COLORS } from '@/styles/theme';
import MatchingList from './MatchingList';
import ToggleButton from './ToggleButton';
import { useState } from 'react';

const AdminTemplate = ({ matchingData }: any) => {
  const [activeStatus, setActiveStatus] = useState(1);
  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        관리자
      </Text>
      <Text size={13} weight="400" color={COLORS.gray818} className="sub-title">
        매칭 관리
      </Text>
      <ToggleButton
        activeItem={activeStatus - 1}
        setActiveItem={setActiveStatus}
      />
      <MatchingList
        activeStatus={activeStatus}
        data={matchingData[activeStatus - 1]}
      />
    </TemplateWrapper>
  );
};

const TemplateWrapper = styled.div`
  width: 720px;
  height: 100%;
  min-height: calc(100vh - 188px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  .title,
  .sub-title {
    margin-bottom: 14px;
  }
`;

export default AdminTemplate;
