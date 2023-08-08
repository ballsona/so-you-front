import { COLORS } from '@/styles/theme';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ArrowButton = ({ color }: { color: string }) => (
  <Button
    variants={{
      open: { rotate: 180 },
      closed: { rotate: 0 },
    }}
    transition={{ duration: 0.2 }}
  >
    <svg width="12" height="8" viewBox="0 0 12 8">
      <path
        d="M6.73455 6.95482C6.33863 7.38342 5.66137 7.38342 5.26545 6.95482L2.35443 3.80355C1.76278 3.16307 2.21705 2.125 3.08898 2.125L8.91102 2.125C9.78295 2.125 10.2372 3.16307 9.64557 3.80355L6.73455 6.95482Z"
        fill={color}
      />
    </svg>
  </Button>
);

export default ArrowButton;

const Button = styled(motion.button)`
  width: 12px;
  height: 8px;
  display: flex;

  background: none;
`;
