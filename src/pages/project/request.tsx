import ProjectRequestTemplate from '@/components/project/ProjectRequestTemplate';
import Layout from '@/components/common/Layout';
import { withAuth } from '@/utils/withAuth';

export const getServerSideProps = withAuth(async (ctx) => ({ props: {} }));

const ProjectRequestPage = () => (
  <Layout activeTab="project">
    <ProjectRequestTemplate />
  </Layout>
);

export default ProjectRequestPage;
