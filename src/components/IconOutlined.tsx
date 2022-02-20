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
    color = 'inherit',
    rotate,
  }: IconProps) => css`
    font-size: ${size}px;
    width: ${size}px;
    height: ${size}px;
    color: ${inative ? '#B9BDCF' : color};
    ${rotate && `transform: rotate(${rotate}deg)`};
    user-select: inherit;
    &:hover {
      cursor: inherit;
    }
  `}
`;

export default IconOutlined;
