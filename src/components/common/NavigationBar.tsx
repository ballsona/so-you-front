import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NAV_INFO } from '@/constants/navigation';
import { motion } from 'framer-motion';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';

import Text from './Text';
import SearchIcon from '@/assets/icon/search.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchFilter, searchKeyWord } from '@/stores/influencerState';
import DetailSearchModal from '@/components/common/Modal/DetailSearchModal';
import ArrowButton from './ArrowButton';

import { searchInfluencerAsync } from '@/apis/search';
import { useModal } from '@/hooks/useModal';
import { userTypeAtom } from '@/stores/userState';

// TODO
interface NavigationBarProps {
  activeTab?: string;
}

const NavigationBar = ({ activeTab }: NavigationBarProps) => {
  const router = useRouter();
  const {
    modalState: { visible, name },
    openModal,
    closeModal,
  } = useModal();

  const userType = useRecoilValue(userTypeAtom);
  const [navMenu, setNavMenu] = useState<any[]>([]);

  useEffect(() => {
    if (!userType) return;

    setNavMenu([
      'project',
      'influencer',
      'report',
      userType === 'manager' ? 'admin' : 'mypage',
    ]);
  }, [userType]);

  // 검색 키워드
  const [keyword, setKeyword] = useRecoilState(searchKeyWord);
  // 상세 검색 필터
  const filter = useRecoilValue(searchFilter);
  const { category, popularity, costRange } = filter;

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleModal = () => {
    visible ? closeModal() : openModal(<DetailSearchModal />, 'search-filter');
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
    <>
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
          <SearchIcon onClick={onSearchButtonClick} />
          <SearchBarInput value={keyword} onChange={handleKeyword} />
        </SearchBar>
        <NavListContainer>
          {navMenu.map((menu) => (
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
    </>
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

  .logo-text {
    position: absolute;
    top: calc(50% - 18.75px);
    left: 25px;
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  position: absolute;
  top: calc(50% - 17px);
  left: calc(50% - 150px);

  > svg {
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

  position: absolute;
  top: calc(50% - 11.25px);
  right: 50px;

  .nav-item {
    cursor: pointer;
  }
`;
