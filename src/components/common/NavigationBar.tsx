import { useRouter } from 'next/router';
import { NAV_INFO } from '@/constants/navigation';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { COLORS } from '@/styles/theme';

import Text from './Text';
import SearchIcon from '@/assets/icon/search.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  detailSearchMode,
  influencerSearchFilter,
  searchKeyWord,
} from '@/stores/influencerAtom';
import DetailSearchModal from './DetailSearchModal/DetailSearchModal';
import ArrowButton from './ArrowButton';
import React, { useCallback } from 'react';
import { tokenAtom } from '@/stores/userAtom';
import { searchInfluencerAsync } from '@/apis/search';

const navmenu = ['project', 'influencer', 'report', 'mypage'] as const;

interface NavigationBarProps {
  activeTab?: (typeof navmenu)[number];
}

// TODO 렌더링 관리가 상당히 필요해보이죠..
const NavigationBar = ({ activeTab }: NavigationBarProps) => {
  const router = useRouter();
  // 검색 키워드
  const [keyword, setKeyword] = useRecoilState(searchKeyWord);
  const filter = useRecoilValue(influencerSearchFilter);
  const { category, popularity, costRange } = filter;

  // 상세 검색 여부
  const [isDetailSearchMode, setDetailSearchMode] =
    useRecoilState(detailSearchMode);
  const { token } = useRecoilValue(tokenAtom);

  const handleDetailSearchModal = () => setDetailSearchMode((prev) => !prev);

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSearchButtonClick = async () => {
    if (keyword === '') {
      alert('검색어를 입력해주세요.');
    }
    const res = await searchInfluencerAsync(
      keyword,
      category,
      popularity,
      costRange,
      token,
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
            onClick={handleDetailSearchModal}
            initial={false}
            animate={isDetailSearchMode ? 'open' : 'closed'}
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

      {isDetailSearchMode && <DetailSearchModal />}

      {/*<ModalContainer>
        <>
          <DetailSearchModal />
        </>
      </ModalContainer>
      {isDetailSearchMode && (
        <ModalBackground onClick={handleDetailSearchModal} />
      )}*/}
    </>
  );
};

export default NavigationBar;

/** NavigationBar Style */

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${COLORS.primary};
  position: relative;
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
