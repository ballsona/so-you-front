import MainTemplate from '@/components/MainTemplate';
import { useModal } from '@/hooks/useModal';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';

export interface MainPageProps {
  isLoggedIn: boolean;
}

export const getServerSideProps: GetServerSideProps<MainPageProps> = async (
  ctx: GetServerSidePropsContext,
) => {
  const { accessToken } = ctx.req.cookies;
  return { props: { isLoggedIn: !!accessToken } };
};

const Main = ({ isLoggedIn }: MainPageProps) => {
  const { closeModal } = useModal();

  useEffect(() => {
    closeModal();
  }, [closeModal]);

  return <MainTemplate isLoggedIn={isLoggedIn} />;
};

export default Main;
