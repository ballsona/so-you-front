import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { MyPageFormType, UserType } from '@/types/user';
import { COLORS } from '@/styles/theme';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import { useModal } from '@/hooks/useModal';
import { categoryListAtom } from '@/stores/categoryState';
import { useEffect } from 'react';
import { updateUserInfoAsync } from '@/apis/user';
import TextInput from '../common/TextInput';
import CategoryTag from '../common/CategoryTag';
import CategorySelectModal from '../common/Modal/CategorySelectModal';
import UpdatePasswordModal from '../common/Modal/UpdatePasswordModal';

type PE = HTMLParagraphElement;

interface MyPageFormProps {
  type: UserType;
  defaultData: any;
}

const MyPageForm = ({ type, defaultData }: MyPageFormProps) => {
  const router = useRouter();
  const { openModal } = useModal();
  const { messageRefs, setMessage } = useMessageRefs();

  const [selectedCategories, setSelectedCategories] =
    useRecoilState(categoryListAtom);

  const { birth_date, category, cost, channel_id, youtube_link, name } =
    defaultData;

  const formMethods = useForm<MyPageFormType>({
    defaultValues: {
      birth_date,
      cost,
      name,
      channel_id,
      youtube_link,
    },
  });
  const { handleSubmit, control } = formMethods;

  const fields = useWatch({ control });

  // 카테고리 세팅
  useEffect(() => {
    setSelectedCategories(category ? JSON.parse(category) : []);
  }, [category, setSelectedCategories]);

  // 정보 변경
  const updateInfo = async () => {
    const {
      birth_date: newBirth,
      cost: newCost,
      youtube_link: newLink,
    } = fields;
    const res = await updateUserInfoAsync({
      category: JSON.stringify(selectedCategories),
      birth_date: newBirth ?? birth_date,
      cost: newCost ?? cost,
      youtube_link: newLink ?? youtube_link,
    });

    if (!res.isSuccess) {
      alert('정보를 변경할 수 없습니다.');
      return;
    }

    alert('정보를 업데이트하였습니다.');
    router.reload();
  };

  const user = type === 'influencer' ? '인플루언서' : '광고주';

  return (
    <FormProvider {...formMethods}>
      <Wrapper>
        <MessageBox ref={(node: PE) => (messageRefs.current[0] = node)} />
        <InputWrap>
          <Label>이메일</Label>
          <TextInput
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            defaultValue={defaultData.email}
            disabled
          />
        </InputWrap>
        <MessageBox ref={(node: PE) => (messageRefs.current[1] = node)} />
        <InputWrap>
          <Label>비밀번호</Label>
          <TextInput
            type="password"
            name="password"
            placeholder="********"
            className="input-with-btn"
            disabled
          />
          <MiniButton
            onClick={() =>
              openModal(
                <UpdatePasswordModal
                  name={defaultData.name}
                  birth_date={defaultData.birth_date}
                />,
                true,
              )
            }
          >
            변경
          </MiniButton>
        </InputWrap>
        <InputWrap>
          <Label>이름</Label>
          <TextInput
            name="name"
            placeholder={`${user}님의 이름을 입력해주세요`}
            disabled
          />
        </InputWrap>
        <MessageBox ref={(node: PE) => (messageRefs.current[3] = node)} />
        <InputWrap>
          <Label>생년월일</Label>
          <TextInput
            name="birth_date"
            placeholder={`${user}님의 생년월일을 입력해주세요 (YYYY-MM-DD)`}
          />
        </InputWrap>

        {type === 'influencer' && (
          <>
            <InputWrap className="category-row">
              <Label>카테고리</Label>
              {selectedCategories.map((c) => (
                <CategoryTag key={c} theme={c} />
              ))}
              <MiniButton
                onClick={() => openModal(<CategorySelectModal />, true)}
              >
                {selectedCategories.length > 0 ? '수정' : '추가'}
              </MiniButton>
            </InputWrap>
            <MessageBox ref={(node: PE) => (messageRefs.current[4] = node)} />
            <InputWrap>
              <Label>예상 광고비</Label>
              <TextInput
                type="number"
                name="cost"
                placeholder="예상 광고비를 입력해주세요"
              />
            </InputWrap>
            <InputWrap>
              <Label>채널 링크</Label>
              <TextInput
                name="youtube_link"
                placeholder="연결할 유튜브 링크를 등록해주세요"
              />
            </InputWrap>
            <InputWrap>
              <Label>채널 아이디</Label>
              <TextInput
                name="channel_id"
                placeholder="채널 아이디를 입력해주세요"
                disabled
              />
            </InputWrap>
          </>
        )}
        <ButtonsWrap>
          <Button onClick={() => router.back()} className="cancel-btn">
            뒤로
          </Button>
          <Button onClick={handleSubmit(updateInfo)} className="submit-btn">
            변경하기
          </Button>
        </ButtonsWrap>
      </Wrapper>
    </FormProvider>
  );
};

export default MyPageForm;

const Wrapper = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .category-row {
    width: 1000px;
  }
`;

const MessageBox = styled.p`
  width: 100%;
  height: 18px;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
  color: ${COLORS.primary};
  margin-top: -16px;
  margin-left: 116px;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .input-with-btn {
    width: 250px;
  }
  .code-input {
    width: 80px;
    margin-left: 4px;
  }

  .verified-btn {
    background-color: ${COLORS.grayA3A};
  }
`;

const Label = styled.div`
  width: 100px;
  height: 32px;
  border-right: 3px solid ${COLORS.primary};
  font-size: 15px;
  font-weight: 600;
  line-height: 32px;
  margin-right: 16px;
`;

const MiniButton = styled.button`
  width: 80px;
  height: 32px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border-radius: 2px;
  margin-left: 4px;
`;

const ButtonsWrap = styled.div`
  margin: 50px auto 0px;

  display: flex;

  .cancel-btn {
    background-color: ${COLORS.grayC4C};
    width: 100px;
    margin-right: 5px;
  }

  .submit-btn {
    background-color: ${COLORS.primary};
    width: 160px;
  }
`;

const Button = styled.button`
  height: 42px;
  color: ${COLORS.white};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
`;
