import React from 'react';
import styled from 'styled-components';
import { Logo } from 'components/Logo';

export const Header = styled.header.attrs({
  children: <Logo />,
})`
  width: 100%;
  margin-bottom: 32px;
  box-sizing: border-box;
  padding: 12px 0px 0px 0px;

  @media screen and (max-width: 790px) {
    padding: 12px 12px 0px 12px;
  }

  @media screen and (min-width: 790px) {
    margin: auto;
    max-width: 1200px;
    margin-bottom: 32px;
    padding: 12px 12px 0px 12px;
  }
`;

export default Header;
