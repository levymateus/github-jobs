import React from 'react';
import styled from 'styled-components';
import { H3, HTML } from 'components/Typo';

type HowToApplyProps = {
  description: string
}

const Wrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  width: 100%;

  p {
    margin-top: 16px;
    color: #334680;
  }
`;

export function HowToApply({ description }: HowToApplyProps) {
  return (
    <Wrapper>
      <H3>how to apply</H3>
      <HTML
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Wrapper>
  );
}

export default HowToApply;
