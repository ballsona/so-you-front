import { COLORS } from '@/styles/theme';
import Text from '../common/Text';
import ProgressBar from './ProgressBar';

import { useRecoilState } from 'recoil';
import { projectRequestStep } from '@/stores/projectState';

import * as styles from './ProjectRequestTemplate.style';
import { PROCESS_INFO } from './RequestProcessInfo';

const ProjectRequestTemplate = () => {
  const [activeStep, setActiveStep] = useRecoilState(projectRequestStep);
  const { title, content: Content } = PROCESS_INFO[activeStep];

  return (
    <styles.TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        {title}
      </Text>
      <ProgressBar activeStep={activeStep} />
      <Content />
    </styles.TemplateWrapper>
  );
};

export default ProjectRequestTemplate;
