import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { COLORS } from '@/styles/theme';
import InfluencerList from '@/components/influencer/InfluencerList';
import { useModal } from '@/hooks/useModal';
import { getInfluencerDetailInfoAsync } from '@/apis/influencer';
import InfluencerInfoModal from '../common/Modal/InfluencerInfoModal';

interface InfluencerSearchTemplateProps {
  keyword: string;
  data: any[];
}

const InfluencerSearchTemplate = ({
  keyword,
  data,
}: InfluencerSearchTemplateProps) => {
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
        <span className="keyword">{keyword}</span> 검색 결과
      </Text>
      {data && data.length ? (
        <InfluencerList data={data} onClickItem={onClickItem} />
      ) : (
        <>검색 결과가 없습니다</>
      )}
    </TemplateWrapper>
  );
};

export default InfluencerSearchTemplate;

/** InfluencerSearchTemplate Style */

const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  min-height: calc(100vh - 188px);

  .title {
    margin-bottom: 29px;
  }

  .keyword {
    color: ${COLORS.primary};
    margin-right: 5px;
  }
`;
