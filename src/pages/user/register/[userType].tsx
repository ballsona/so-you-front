import { useRouter } from 'next/router';
import { UserType } from '@/types/user';
import { withAuth } from '@/utils/withAuth';
import RegisterTemplate from '@/components/user/RegisterTemplate';

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

const Register = () => {
  const router = useRouter();
  const userType = router.query.userType as UserType;

  return <RegisterTemplate type={userType} />;
};

export default Register;
