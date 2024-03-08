import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { COLORS } from '@/styles/theme';
import { motion } from 'framer-motion';
import { mainPageTitleVariants } from '@/styles/motion';
import Text from '@/components/common/Text';

import ClientBackground from '@/assets/image/client-background-img.jpg';
import InfluencerBackground from '@/assets/image/influencer-background-img.jpg';
import ClientIcon from '@/assets/icon/client-logo.svg';
import InfluencerIcon from '@/assets/icon/influencer-logo.svg';

const theme_color = {
  client: '#B15ADA',
  influencer: COLORS.primary,
};

interface IntroSectionProps {
  isDetailed?: boolean;
  isLoggedIn?: boolean;
}

export const IntroSection = ({
  isDetailed = true,
  isLoggedIn,
}: IntroSectionProps) => {
  const router = useRouter();

  return (
    <SectionsWrap>
      <MainSection>
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          variants={mainPageTitleVariants}
          className="motion-div"
        >
          <ClientIcon />
          <Text color={COLORS.white} size={32} className="section-title">
            <Title color={theme_color.client}>{`'광고주' `}</Title>
            이신가요?
          </Text>
          {isDetailed && (
            <Text
              color={COLORS.white}
              size={20}
              weight="300"
              className="content"
            >
              나의 컨텐츠를 <br /> 홍보해 줄 인플루언서를 <br />
              매칭해보세요
            </Text>
          )}
        </motion.div>
        <Button
          color={theme_color.client}
          onClick={() =>
            router.push(
              isLoggedIn ? '/project/request' : '/user/register/client',
            )
          }
        >
          {isDetailed ? '매칭하기' : '다음'}
        </Button>
        <Image
          src={ClientBackground}
          alt="client"
          className="background-img"
          layout="fill"
          sizes="50vw"
          priority
        />
      </MainSection>
      <MainSection>
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          variants={mainPageTitleVariants}
          className="motion-div"
        >
          <InfluencerIcon />
          <Text color={COLORS.white} size={32} className="section-title">
            <Title color={theme_color.influencer}>{`'인플루언서' `}</Title>
            이신가요?
          </Text>
          {isDetailed && (
            <Text
              color={COLORS.white}
              size={20}
              weight="300"
              className="content"
            >
              나만의 카테고리와 <br />
              적합한 광고주 분들과 <br /> 협업해보세요
            </Text>
          )}
        </motion.div>
        <Button
          color={theme_color.influencer}
          onClick={() =>
            router.push(
              isLoggedIn ? '/project/request' : '/user/register/influencer',
            )
          }
        >
          {isDetailed ? '등록하기' : '다음'}
        </Button>
        <Image
          src={InfluencerBackground}
          alt="influencer"
          className="background-img"
          layout="fill"
          sizes="50vw"
          priority
        />
      </MainSection>
    </SectionsWrap>
  );
};

export default IntroSection;

/** MainTemplate Style */

const SectionsWrap = styled.div`
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

  .motion-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .section-title {
    margin: 24px 0px 20px;
  }

  .content {
    width: 190px;
    text-align: center;
  }

  > span {
    z-index: -10;
  }
`;

const Title = styled.span`
  color: ${(props) => props.color};
  font-weight: 700;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 200px;
  color: ${COLORS.white};
  background-color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 700;
  margin-top: 25px;
`;
