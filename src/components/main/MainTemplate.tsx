import styled from '@emotion/styled';
import Image from 'next/image';
import { COLORS } from '@/styles/theme';

import AdvertiserBackground from '@/assets/image/advertiser-background-img.jpg';
import InfluencerBackground from '@/assets/image/influencer-background-img.jpg';
import Text from '../common/Text';

const INFO = {
  advertiser: {
    title: '광고주',
    icon: '',
    color: '#B15ADA',
    background_img: AdvertiserBackground,
    content: '나의 컨텐츠를 홍보해 줄 인플루언서를 매칭해보세요',
  },
  influencer: {
    title: '인플루언서',
    icon: '',
    color: COLORS.primary,
    background_img: InfluencerBackground,
    content: '나의 컨텐츠를 홍보해 줄 인플루언서를 매칭해보세요',
  },
};

const MainTemplate = () => (
  <TemplateWrapper>
    <MainSection>
      <Text color={COLORS.white} size={54} weight="400">
        <Title
          color={INFO.advertiser.color}
        >{`'${INFO.advertiser.title}'`}</Title>
        이신가요?
      </Text>
      <Text color={COLORS.white} size={30} weight="300" className="content">
        {INFO.advertiser.content}
      </Text>
      <Button>매칭하기</Button>

      <Image
        src={INFO.advertiser.background_img}
        alt="advertiser"
        className="background-img"
        layout="fill"
      />
    </MainSection>
    <MainSection>
      <Text color={COLORS.white} size={54} weight="400">
        <Title
          color={INFO.influencer.color}
        >{`'${INFO.influencer.title}'`}</Title>
        이신가요?
      </Text>
      <Text color={COLORS.white} size={30} weight="300" className="content">
        {INFO.influencer.content}
      </Text>
      <Button>등록하기</Button>

      <Image
        src={INFO.influencer.background_img}
        alt="influencer"
        className="background-img"
        layout="fill"
      />
    </MainSection>
  </TemplateWrapper>
);

export default MainTemplate;

/** MainTemplate Style */

const TemplateWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const MainSection = styled.section`
  width: 50%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .background-img {
    z-index: -10;
  }

  .content {
    width: 290px;
  }
`;

const Background = styled.div`
  width: 50%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Title = styled.span`
  color: ${(props) => props.color};
  font-weight: 700;
`;

const Button = styled.button`
  width: 240px;
  height: 80px;
  border-radius: 200px;
  color: ${COLORS.white};
  font-size: 32px;
  font-weight: 700;
`;
