import { PropsWithChildren } from 'react';
import NavigationBar from './NavigationBar';

import UserElement from '@/assets/image/user-element.png';
import AdminElement from '@/assets/image/admin-element.svg';
import styled from '@emotion/styled';
import Image from 'next/image';

interface LayoutProps {
  pageType?: 'user' | 'admin';
  activeTab?: string;
}

const Layout = ({
  pageType = 'user',
  activeTab,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <NavigationBar activeTab={activeTab} />
      <Wrapper>
        {children}
        {pageType === 'user' ? (
          <>
            <Element className="circle1">
              <Image src={UserElement} width={361} height={361} />
            </Element>
            <Element className="circle2">
              <Image src={UserElement} width={244} height={244} />
            </Element>
            <Element className="circle3">
              <Image src={UserElement} width={361} height={361} />
            </Element>
          </>
        ) : (
          <AdminElement className="wave" />
        )}
      </Wrapper>
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100vw;
  overflow: hidden;
  position: relative;

  .circle1 {
    top: 164px;
    left: -200px;
  }

  .circle2 {
    bottom: -100px;
    left: 45px;
  }

  .circle3 {
    bottom: -63px;
    right: -90px;
  }
`;

const Element = styled.div`
  position: absolute;
  z-index: -10;
`;
