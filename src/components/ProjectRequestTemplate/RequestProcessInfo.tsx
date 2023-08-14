import InfluencerSelectForm from './InfluencerSelectForm';
import RequestForm from './RequestForm';

interface ProcessInfoType {
  title: string;
  content: () => JSX.Element;
}

export const PROCESS_INFO: ProcessInfoType[] = [
  {
    title: '프로젝트 의뢰',
    content: () => <RequestForm />,
  },
  {
    title: '인플루언서 매칭',
    content: () => <InfluencerSelectForm />,
  },
  {
    title: '담당자 배정',
    content: () => <>담당자 배정</>,
  },
  {
    title: '결제하기',
    content: () => <>결제하기</>,
  },
  {
    title: '프로젝트 성사',
    content: () => <>프로젝트 성사</>,
  },
];
