import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import Image from 'next/image';
import InfluencerList from '@/components/common/InfluencerList';

interface InfluencerListTemplateProps {
  data: any[];
  onClickInfluencerItem: (id: number) => void;
}

const InfluencerListTemplate = ({
  data,
  onClickInfluencerItem,
}: InfluencerListTemplateProps) => {
  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        인플루언서
      </Text>
      <InfluencerList
        data={data}
        onClickInfluencerItem={onClickInfluencerItem}
      />
    </TemplateWrapper>
  );
};

export default InfluencerListTemplate;

/** InfluencerListTemplate Style */

const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    margin: 48px 0px 29px;
  }
`;
