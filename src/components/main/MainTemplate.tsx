import styled from '@emotion/styled';
import Image from 'next/image';
import Text from '@/components/common/Text';

import { COLORS } from '@/styles/theme';

import ClientBackground from '@/assets/image/client-background-img.jpg';
import InfluencerBackground from '@/assets/image/influencer-background-img.jpg';
import ClientIcon from '@/assets/icon/client-logo.svg';
import InfluencerIcon from '@/assets/icon/influencer-logo.svg';

const INFO = {
  client: {
    title: '광고주',
    color: '#B15ADA',
    icon: ClientIcon,
    background_img: ClientBackground,
    content: '나의 컨텐츠를 홍보해 줄 인플루언서를 매칭해보세요',
  },
  influencer: {
    title: '인플루언서',
    color: COLORS.primary,
    icon: InfluencerIcon,
    background_img: InfluencerBackground,
    content: '나의 컨텐츠를 홍보해 줄 인플루언서를 매칭해보세요',
  },
};

const MainTemplate = () => (
  <TemplateWrapper>
    <MainSection>
      <Text color={COLORS.white} size={54} weight="400">
        <Title color={INFO.client.color}>{`'${INFO.client.title}'`}</Title>
        이신가요?
      </Text>
      <Text color={COLORS.white} size={30} weight="300" className="content">
        {INFO.client.content}
      </Text>
      <Button color={INFO.client.color}>매칭하기</Button>

      <Image
        src={INFO.client.background_img}
        alt="client"
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
      <Button color={INFO.influencer.color}>등록하기</Button>
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

const Title = styled.span`
  color: ${(props) => props.color};
  font-weight: 700;
`;

const Button = styled.button`
  width: 240px;
  height: 80px;
  border-radius: 200px;
  color: ${COLORS.white};
  background-color: ${(props) => props.color};
  font-size: 32px;
  font-weight: 700;
`;
