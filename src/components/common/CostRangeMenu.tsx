import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { costRanges, CostRangeType } from '@/constants/influencer';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/theme';
import ArrowButton from '@/components/common/ArrowButton';

const menuVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

interface CostRangeMenuProps {
  selectedMenu?: CostRangeType;
  setSelectedMenu: (menu: CostRangeType) => void;
}

const CostRangeMenu = ({
  selectedMenu,
  setSelectedMenu,
}: CostRangeMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuWrapper initial={false} animate={isOpen ? 'open' : 'closed'}>
      <SelectedMenu onClick={() => setIsOpen(!isOpen)}>
        {selectedMenu ?? '예산 선택'}
        <ArrowButton color={COLORS.gray484} />
      </SelectedMenu>
      <MenuListWrap
        variants={menuVariants}
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        {costRanges
          .filter((r) => r !== selectedMenu)
          .map((range) => (
            <Menu
              key={range}
              variants={menuVariants}
              onClick={() => {
                setSelectedMenu(range);
                setIsOpen(false);
              }}
            >
              {range}
            </Menu>
          ))}
      </MenuListWrap>
    </MenuWrapper>
  );
};

export default CostRangeMenu;

const MenuWrapper = styled(motion.nav)`
  width: 334px;
  height: 30px;

  color: ${COLORS.grayA3A};
  font-size: 13px;
`;

const SelectedMenu = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  border: 1px solid ${COLORS.grayA3A};
  color: ${COLORS.gray484};
  padding: 0px 11px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuListWrap = styled(motion.ul)`
  pointer-events: ${(props: { pointerEvents: string }) => props.pointerEvents};
  position: relative;
  margin-top: 7px;

  width: 334px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.grayA3A};
  border-radius: 3px;
  z-index: 100;

  clip-path: none !important;
  list-style: none;
`;

const Menu = styled(motion.li)`
  width: fit-content;
  height: 30px;
  background-color: transparent;
  padding: 7px 10px;
  cursor: pointer;
`;
