import { useForm } from 'react-hook-form';
import LoginTemplate from '@/components/LoginTemplate';

import { getUserInfoAsync, loginAsync } from '@/apis/user';
import { LoginInputType } from '@/types/user';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenAtom, userDataAtom } from '@/stores/userState';

const MyPage = () => {
  const router = useRouter();
  const { token } = useRecoilValue(tokenAtom);

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserInfoAsync(token);
      if (res.isSuccess) {
        setUserInfo(res.result.user);
      }
    };

    getUserInfo();
  }, []);
  return <></>;
};

export default MyPage;
