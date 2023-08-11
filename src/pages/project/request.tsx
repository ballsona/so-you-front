import ProjectRequestTemplate from '@/components/ProjectRequestTemplate';
import NavigationBar from '@/components/common/NavigationBar';
import { ProjectRequestDataType } from '@/types/project';
import { useForm } from 'react-hook-form';

const ProjectRequestPage = () => {
  return (
    <>
      <NavigationBar activeTab="project" />
      <ProjectRequestTemplate />
    </>
  );
};

export default ProjectRequestPage;
