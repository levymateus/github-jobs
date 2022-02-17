import React from 'react';
import styled from 'styled-components';
import { Logo } from 'components/Logo';

export const Header = styled.header.attrs({
  children: <Logo />,
})`
  width: 100%;
  height: 36px;
`;

export default Header;
