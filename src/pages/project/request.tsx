import ProjectRequestTemplate from '@/components/ProjectRequestTemplate';
import NavigationBar from '@/components/common/NavigationBar';

const ProjectRequestPage = () => {
  return (
    <>
      <NavigationBar activeTab="project" />
      <ProjectRequestTemplate />
    </>
  );
};

export default ProjectRequestPage;
