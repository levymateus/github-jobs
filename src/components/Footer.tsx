import React from 'react';
import styled from 'styled-components';

type FooterProps = {
  username: string
}

const Wrapper = styled.footer`
  width: 100%;
  position: relative;
  padding: 24px 0px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-style: normal;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  background-color: #F6F7FB;

  p {
    font-weight: 500;
    color: #B9BDCF;
    a {
      color: inherit;
      font-weight: 700;
      text-decoration: underline;
    }
    a:hover {
      cursor: pointer;
    }
    a:active {
      color: inherit
    }
  }

  @media screen and (max-width: 790px) {
    position: relative;
  }

  @media screen and (min-width: 790px) {
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;

export function Footer({ username }: FooterProps) {
  return (
    <Wrapper>
      <p>
        created by
        {' '}
        <a href="https://github.com/levymateus" target="_blank" rel="noreferrer">{username}</a>
        {' '}
        - devChallenges.io
      </p>
    </Wrapper>
  );
}

export default Footer;
