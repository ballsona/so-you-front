import { PropsWithChildren } from 'react';
import NavigationBar from './NavigationBar';
import { UserType } from '@/types/user';
import UserElement from '@/assets/image/user-element.png';
import AdminElement from '@/assets/image/admin-element.svg';
import styled from '@emotion/styled';
import Image from 'next/image';
import { NavType } from '@/constants/navigation';

interface LayoutProps {
  /** 일반 유저(인플루언서 및 광고주) or 관리자 */
  userType?: UserType;
  /** 현재 활성화된 탭 */
  activeTab?: NavType;
}

const Layout = ({
  userType,
  activeTab,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <NavigationBar userType={userType} activeTab={activeTab} />
      <Wrapper>
        {userType !== 'manager' ? (
          <>
            <Element className="bubble1">
              <Image src={UserElement} width={361} height={361} />
            </Element>
            <Element className="bubble2">
              <Image src={UserElement} width={244} height={244} />
            </Element>
            <Element className="bubble3">
              <Image src={UserElement} width={361} height={361} />
            </Element>
          </>
        ) : (
          <AdminElement className="wave" />
        )}
        {children}
      </Wrapper>
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100vw;
  overflow: hidden;
  position: relative;
  padding: 108px 0px 80px;

  .bubble1 {
    top: 164px;
    left: -200px;
  }

  .bubble2 {
    bottom: -100px;
    left: 45px;
  }

  .bubble3 {
    bottom: -63px;
    right: -90px;
  }

  .wave {
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: -10;
  }
`;

const Element = styled.div`
  position: absolute;
  z-index: -10;
`;
