import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface TextProps {
  size?: number;
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800';
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
  className?: string;
}

const Text = ({
  size = 18,
  weight = '400',
  color = '#000',
  children,
  onClick,
  className,
}: TextProps) => (
  <TextWrapper
    size={size}
    weight={weight}
    color={color}
    className={className}
    onClick={onClick}
  >
    {children}
  </TextWrapper>
);

export default Text;

const TextWrapper = styled.div(
  ({ size, weight, color }: Exclude<TextProps, 'children'>) => ({
    fontFamily: 'Pretendard Variable',
    fontSize: size,
    fontWeight: weight,
    lineHeight: size ? `${size * 1.5}px` : 'auto',
    color,
  }),
);
