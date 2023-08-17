import { useRouter } from 'next/router';
import { userType } from '@/types/user';
import RegisterTemplate from '@/components/user/RegisterTemplate';

const Register = () => {
  const router = useRouter();
  const userType = router.query.userType as userType;

  return <RegisterTemplate type={userType} />;
};

export default Register;
