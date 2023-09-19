import { useState } from 'react';
import { COLORS } from '@/styles/theme';
import { RequestFormType } from '@/types/project';
import {
  getMatchingInfluencerListAsync,
  requestProjectAsync,
} from '@/apis/project';
import InfluencerList from '@/components/influencer/InfluencerList';
import Text from '@/components/common/Text';

import { useModal } from '@/hooks/useModal';
import InfluencerSelectModal from '@/components/common/Modal/InfluenceSelectModal';
import { useRecoilState } from 'recoil';
import { projectRequestForm } from '@/stores/projectState';
import { getUserInfoAsync } from '@/apis/user';
import styled from '@emotion/styled';
import RegisterManager from '../RegisterManager';
import RequestForm from './RequestForm';
import ProgressBar from './ProgressBar';

export const TITLE = [
  '프로젝트 의뢰',
  '인플루언서 매칭',
  '담당자 배정',
  '결제하기',
  '프로젝트 성사',
];

const ProjectRequestTemplate = () => {
  const { openModal, closeModal } = useModal();

  const [activeStep, setActiveStep] = useState(1);
  const [influencerList, setInfluencerList] = useState([]);
  const [requestForm, setRequestForm] = useRecoilState(projectRequestForm);

  const onSubmitRequestForm = async (formFields: RequestFormType) => {
    const { popularity, costRange, category, dateRange } = formFields;

    const res = await getMatchingInfluencerListAsync(
      popularity,
      costRange,
      category,
    );
    if (!res.isSuccess) {
      alert('매칭할 수 있는 인플루언서가 없습니다.');
      return;
    }

    console.log(formFields);

    setRequestForm(formFields);
    setInfluencerList(res.result.response);
    setActiveStep((prev: number) => prev + 1);
  };

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
    setActiveStep((prev: number) => prev + 1);
  };

  const onClickInfluencer = (id: number) => {
    const focusedInfo = influencerList.filter((i: any) => i.index === id)[0];
    openModal(
      <InfluencerSelectModal
        info={focusedInfo}
        onSelectItem={() => onSelectInfluencer(id)}
      />,
    );
  };

  const renderContent = () => {
    switch (activeStep) {
      case 1: {
        return <RequestForm onSubmit={onSubmitRequestForm} />;
      }
      case 2: {
        return (
          <InfluencerList
            data={influencerList}
            onClickItem={onClickInfluencer}
          />
        );
      }
      case 3: {
        return (
          <RegisterManager
            goNextStep={() => setActiveStep((prev: number) => prev + 1)}
          />
        );
      }
      case 4: {
        return <>결제 단계는 준비중입니다</>;
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
      <ContentWrap>{renderContent()}</ContentWrap>
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

const ContentWrap = styled.div``;
