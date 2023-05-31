import styled from '@emotion/styled';
import { COLORS } from '@/styles/theme';

import SearchIcon from '@/assets/icon/search.svg';
import { NAV_INFO } from '@/constants/navigation';
import Text from './Text';

const navmenu = ['project', 'influencer', 'report', 'mypage'];

const NavigationBar = () => (
  <Wrapper>
    <Text size={25} weight="700" color={COLORS.white} className="logo-text">
      SoYOU
    </Text>
    <SearchBar>
      <SearchIcon className="search-icon" />
    </SearchBar>
    <NavListContainer>
      {navmenu.map((menu) => (
        <Text
          key={menu}
          size={15}
          weight="400"
          color={COLORS.white}
          className="nav-item"
        >
          {NAV_INFO[menu].label}
        </Text>
      ))}
    </NavListContainer>
  </Wrapper>
);

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

  .search-icon {
  }
`;

const NavListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  position: absolute;
  top: calc(50% - 11.25px);
  right: 50px;
`;
