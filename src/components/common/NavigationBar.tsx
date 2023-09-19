import React from 'react';
import { useRouter } from 'next/router';
import { NAV_INFO, NavType } from '@/constants/navigation';
import { motion } from 'framer-motion';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchFilter, searchKeyWord } from '@/stores/influencerState';
import DetailSearchModal from '@/components/common/Modal/DetailSearchModal';
import { searchInfluencerAsync } from '@/apis/search';
import { useModal } from '@/hooks/useModal';

import SearchIcon from '@/assets/icon/search.svg';
import ProfileIcon from '@/assets/icon/default-profile-icon.svg';
import { UserType } from '@/types/user';
import ArrowButton from './ArrowButton';
import Text from './Text';

interface NavigationBarProps {
  userType?: UserType;
  activeTab?: NavType;
}

const NavigationBar = ({ userType, activeTab }: NavigationBarProps) => {
  const router = useRouter();
  const {
    modalState: { visible, name },
    openModal,
    closeModal,
  } = useModal();

  const navMenu: NavType[] = [
    'project',
    'influencer',
    'report',
    userType === 'manager' ? 'admin' : 'mypage',
  ];

  // 검색 키워드
  const [keyword, setKeyword] = useRecoilState(searchKeyWord);
  // 상세 검색 필터
  const { category, popularity, costRange } = useRecoilValue(searchFilter);

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleModal = () => {
    if (visible) {
      closeModal();
    } else {
      openModal(<DetailSearchModal />, false, 'search-filter');
    }
  };

  const onSearchButtonClick = async () => {
    if (keyword === '') {
      alert('검색어를 입력해주세요!');
      return;
    }

    const res = await searchInfluencerAsync(
      keyword,
      category,
      popularity,
      costRange,
    );

    if (!res.isSuccess) {
      alert(res.result.errorMessage);
    }
  };

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
        <DetailSearchButton
          onClick={handleModal}
          initial={false}
          animate={visible && name === 'search-filter' ? 'open' : 'closed'}
        >
          <ArrowButton color={COLORS.white} />
          <Text size={14} weight="400" color={COLORS.white}>
            상세 검색
          </Text>
        </DetailSearchButton>
        <SearchIcon onClick={onSearchButtonClick} className="search-icon" />
        <SearchBarInput value={keyword} onChange={handleKeyword} />
      </SearchBar>
      <NavListContainer>
        {navMenu.map((menu) =>
          menu === 'mypage' ? (
            <ProfileIcon
              key={menu}
              onClick={() => router.push(NAV_INFO[menu].url)}
            />
          ) : (
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
          ),
        )}
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px 0px 25px;

  .logo-text {
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  position: absolute;
  top: calc(50% - 17px);
  left: calc(50% - 150px);

  .search-icon {
    position: absolute;
    top: calc(50% - 9px);
    right: 15px;
  }
`;

export const SearchBarInput = styled.input`
  width: 300px;
  height: 34px;
  background-color: ${COLORS.white};
  border-radius: 50px;
  border: none;
  padding: 0px 15px;
`;

export const DetailSearchButton = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  position: absolute;
  top: 5px;
  left: -86px;
`;

export const NavListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  .nav-item {
    cursor: pointer;
  }
`;
