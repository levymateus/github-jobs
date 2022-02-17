import React from 'react';
import styled from 'styled-components';

function GithubJobs() {
  return (
    <>
      <strong>Github</strong>
      {' '}
      Jobs
    </>
  );
}

export const Logo = styled.h1.attrs({
  children: <GithubJobs />,
})`
  font-family: Poppins;
  font-style: normal;
  font-size: 24px;
  line-height: 36px;
  color: #282538;
  font-weight: 300;
  strong {
    font-weight: 700;
  }
`;

export default Logo;
