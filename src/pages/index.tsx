import MainTemplate from '@/components/MainTemplate';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export interface MainPageProps {
  isLoggedIn: boolean;
}

export const getServerSideProps: GetServerSideProps<MainPageProps> = async (
  ctx: GetServerSidePropsContext,
) => {
  const { accessToken } = ctx.req.cookies;
  return { props: { isLoggedIn: !!accessToken } };
};

const Main = ({ isLoggedIn }: MainPageProps) => (
  <MainTemplate isLoggedIn={isLoggedIn} />
);

export default Main;
