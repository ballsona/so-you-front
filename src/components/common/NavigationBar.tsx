import { useRouter } from 'next/router';
import { NAV_INFO } from '@/constants/navigation';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/theme';

import Text from './Text';
import SearchIcon from '@/assets/icon/search.svg';

const navmenu = ['project', 'influencer', 'report', 'mypage'] as const;

interface NavigationBarProps {
  activeTab?: (typeof navmenu)[number];
}

const NavigationBar = ({ activeTab }: NavigationBarProps) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Text
        size={25}
        weight="700"
        color={COLORS.white}
        className="logo-text"
        onClick={() => router.push('/')}
      >
        SoYOU
      </Text>
      <SearchBar>
        <SearchIcon />
      </SearchBar>
      <NavListContainer>
        {navmenu.map((menu) => (
          <Text
            key={menu}
            size={15}
            weight={activeTab === menu ? '700' : '400'}
            color={COLORS.white}
            className="nav-item"
            onClick={() => router.push(NAV_INFO[menu].url)}
          >
            {NAV_INFO[menu].label}
          </Text>
        ))}
      </NavListContainer>
    </Wrapper>
  );
};

export default NavigationBar;

/** NavigationBar Style */

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${COLORS.primary};
  position: relative;

  .logo-text {
    position: absolute;
    top: calc(50% - 18.75px);
    left: 25px;
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  width: 300px;
  height: 34px;
  background-color: ${COLORS.white};
  border-radius: 50px;

  position: absolute;
  top: calc(50% - 17px);
  left: calc(50% - 150px);

  > svg {
    position: absolute;
    top: calc(50% - 9px);
    right: 15px;
  }
`;

const NavListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  position: absolute;
  top: calc(50% - 11.25px);
  right: 50px;

  .nav-item {
    cursor: pointer;
  }
`;
