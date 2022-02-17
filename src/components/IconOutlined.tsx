import React from 'react';
import styled, { css } from 'styled-components';

type IconProps = { children: string, size: number, inative?: boolean }

export const IconOutlined = styled.span.attrs({ className: 'material-icons-outlined' })`
  ${({ size }: IconProps) => css`
    font-size: ${size}px;
    width: ${size}px;
    height: ${size}px;
  `}
  ${({ inative }: IconProps) => (!inative ? 'color: rgba(0, 0, 0, 0.54);' : 'color: #B9BDCF;')}
`;

export default IconOutlined;
