import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { COLORS } from '@/styles/theme';
import { RequestFormType } from '@/types/project';
import {
  getMatchingInfluencerListAsync,
  requestProjectAsync,
} from '@/apis/project';
import { projectRequestForm } from '@/stores/projectState';
import styled from '@emotion/styled';
import { useModal } from '@/hooks/useModal';
import InfluencerSelectModal from '@/components/common/Modal/InfluenceSelectModal';
import InfluencerList from '@/components/influencer/InfluencerList';
import Text from '@/components/common/Text';
import { getUserInfoAsync } from '@/apis/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MatchingStep from './MatchingStep';
import ManagerStep from './ManagerStep';
import ProgressBar from './ProgressBar';
import PaymentStep from './PaymentStep';
import InfluencerSelectStep from './InfluencerSelectStep';

export const TITLE = [
  '프로젝트 의뢰',
  '인플루언서 매칭',
  '담당자 배정',
  '결제하기',
  '프로젝트 성사',
];

const ProjectRequestTemplate = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  // 현재 의뢰 프로세스 단계
  const [activeStep, setActiveStep] = useState(1);
  // 매칭 조건 폼
  const [requestForm, setRequestForm] = useRecoilState(projectRequestForm);
  // 매칭 가능한 인플루언서 리스트
  const [influencerList, setInfluencerList] = useState([]);

  const goNextStep = () => setActiveStep((prev) => prev + 1);
  const goBeforeStep = () => setActiveStep((prev) => prev - 1);

  // [MatchingStep] 프로젝트 의뢰 함수
  const onSubmitRequestForm = async (formFields: RequestFormType) => {
    const res = await getMatchingInfluencerListAsync(formFields);
    if (!res.isSuccess) {
      alert('매칭할 수 있는 인플루언서가 없습니다.');
      return;
    }

    setRequestForm(formFields);
    setInfluencerList(res.result.response);
    goNextStep();
  };

  // [InfluencerList] 인플루언서 클릭시 실행되는 함수
  const onClickInfluencer = (id: number) => {
    const focusedInfo = influencerList.filter((i: any) => i.index === id)[0];
    openModal(
      <InfluencerSelectModal
        info={focusedInfo}
        onSelectItem={() => onSelectInfluencer(id)}
      />,
    );
  };

  // [InfluencerList] 인플루언서 선택 후 프로젝트 의뢰하는 함수
  const onSelectInfluencer = async (id: number) => {
    const userRes = await getUserInfoAsync();
    if (!userRes.isSuccess) {
      alert('프로젝트 의뢰를 진행할 수 없습니다.');
      return;
    }
    const { name, email } = userRes.result.user;

    const res = await requestProjectAsync(requestForm, name, email, id);
    if (!res.isSuccess) {
      alert('해당 인플루언서를 선택할 수 없습니다.');
      return;
    }
    closeModal();
    goNextStep();
  };

  // Render Step Content
  const renderContent = () => {
    switch (activeStep) {
      case 1: {
        return <MatchingStep onSubmit={onSubmitRequestForm} />;
      }
      case 2: {
        return (
          <InfluencerSelectStep
            influencerList={influencerList}
            onClickInfluencer={onClickInfluencer}
            goBeforeStep={goBeforeStep}
          />
        );
      }
      case 3: {
        return (
          <ManagerStep goBeforeStep={goBeforeStep} goNextStep={goNextStep} />
        );
      }
      case 4: {
        return (
          <PaymentStep goBeforeStep={goBeforeStep} goNextStep={goNextStep} />
        );
      }
      case 5: {
        return (
          <FinalStep>
            <Image src="/process-finish.svg" width="363" height="300" />
            <Text
              size={20}
              weight="700"
              color={COLORS.primary}
              className="title"
            >
              프로젝트가 성사되었습니다.
            </Text>
            <Text size={16} weight="400" color="#a0a0a0">
              이후부터는 <span>리포트 탭</span>을 통해서 확인 해보실 수
              있습니다.
            </Text>
            <Button onClick={() => router.push('/report')}>확인</Button>
          </FinalStep>
        );
      }
      default: {
        return <>잘못된 경로입니다.</>;
      }
    }
  };

  return (
    <TemplateWrapper>
      <Text size={24} weight="700" color={COLORS.gray484} className="title">
        {TITLE[activeStep - 1]}
      </Text>
      <ProgressBar activeStep={activeStep - 1} />
      <div>{renderContent()}</div>
    </TemplateWrapper>
  );
};

export default ProjectRequestTemplate;

const TemplateWrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - 188px); // except padding
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 26px;
  }
`;

const FinalStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-bottom: 11px;
  }

  span {
    font-weight: 700;
    color: ${COLORS.primary};
  }
`;

const Button = styled.button`
  width: 129px;
  height: 42px;
  color: ${COLORS.white};
  background-color: ${COLORS.primary};
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
`;
