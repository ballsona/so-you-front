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
        {pageType === 'user' ? (
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
  }
`;

const Element = styled.div`
  position: absolute;
`;
