import IntroSection from '@/components/common/IntroSection';
import { withAuth } from '@/utils/withAuth';

export const getServerSideProps = withAuth(async (ctx) => ({ props: {} }));

const RegisterIntro = () => <IntroSection isDetailed={false} />;

export default RegisterIntro;
