import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import InfluencerList from '@/components/influencer/InfluencerList';
import { useModal } from '@/hooks/useModal';
import InfluencerInfoModal from '../common/Modal/InfluencerInfoModal';
import { getInfluencerDetailInfoAsync } from '@/apis/influencer';
import { useCallback } from 'react';

interface InfluencerListTemplateProps {
  data: any[];
}

const InfluencerListTemplate = ({ data }: InfluencerListTemplateProps) => {
  const { openModal } = useModal();

  const onClickItem = async (id: number) => {
    const res = await getInfluencerDetailInfoAsync(id);

    if (res.isSuccess) {
      const modalInfo = {
        ...data.filter((d: any) => d.index === id)[0],
        ...res.result.response,
      };
      openModal(<InfluencerInfoModal info={modalInfo} />);
    }
  };

  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        인플루언서
      </Text>
      <InfluencerList data={data} onClickItem={onClickItem} />
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
  margin-top: 108px;
  margin-bottom: 80px;

  .title {
    margin-bottom: 29px;
  }
`;
