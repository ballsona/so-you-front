import LoginTemplate from '@/components/user/LoginTemplate';
import { withAuth } from '@/utils/withAuth';

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

const Login = () => <LoginTemplate />;

export default Login;
