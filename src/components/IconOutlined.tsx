import React from 'react';
import styled, { css } from 'styled-components';

export type IconProps = {
  children: string,
  size: number,
  inative?: boolean,
  color?: string,
  rotate?: number
}

export const IconOutlined = styled.span.attrs({
  className: 'material-icons-outlined',
})`

  ${({
    size,
    inative,
    color = 'color: rgba(0, 0, 0, 0.54)',
    rotate,
  }: IconProps) => css`
    font-size: ${size}px;
    width: ${size}px;
    height: ${size}px;
    ${!inative ? color : 'color: #B9BDCF'};
    ${`transform: rotate(${rotate}deg)`};
  `}
`;

export default IconOutlined;
