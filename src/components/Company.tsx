import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'components/Avatar';
import { Tag } from 'components/Tag';

export type CompanyProps = {
  src: string
  name: string
  location: string[]
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  h3 {
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #334680;
    text-transform: capitalize;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  flex-wrap: nowrap;
  align-content: flex-start;
  justify-content: space-between;
  align-items: flex-start;
`;

export function Company({ src, name, location }: CompanyProps) {
  return (
    <Wrapper>
      <Avatar size="small" src={src} />
      <FlexContainer>
        <h3>{name}</h3>
        <Tag icon="public" text={location.join(', ')} />
      </FlexContainer>
    </Wrapper>
  );
}

export default Company;
