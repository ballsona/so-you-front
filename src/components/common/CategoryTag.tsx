import { ThemeType } from '@/constants/influencer';
import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import Text from './Text';

const CategoryTag = ({ theme }: { theme: ThemeType }) => (
  <Tag>
    <Text color={COLORS.primary} size={12}>
      {theme}
    </Text>
  </Tag>
);

export default CategoryTag;

const Tag = styled.div`
  padding: 4px 10px;
  border: 1px solid ${COLORS.primary};
  border-radius: 50px;
  width: fit-content;
  margin-right: 3px;
`;
