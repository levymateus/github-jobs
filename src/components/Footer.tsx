import React from 'react';
import styled from 'styled-components';

type FooterProps = {
  username: string
}

const Wrapper = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 24px 0px;
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #B9BDCF;
    strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
`;

export function Footer({ username }: FooterProps) {
  return (
    <Wrapper>
      <p>
        created by
        {' '}
        <strong>{username}</strong>
        {' '}
        - devChallenges.io
      </p>
    </Wrapper>
  );
}

export default Footer;
