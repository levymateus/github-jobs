import React from 'react';
import styled from 'styled-components';
import { Badge } from 'components/Badge';
import { Tag } from 'components/Tag';

export type JobDescProps = {
  title: string
  fulltime?: boolean
  published: string
}

const Wrapper = styled.div`
  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    color: #334680;
  }

  @media screen and (max-width: 790px) {
    h1 {
      margin-bottom: 4px;
    }
  }
`;

const FlexRow = styled.div`
  margin-bottom: 8px;
  display: flex;

  @media screen and (max-width: 790px) {
    flex-direction: column;
  }

  @media screen and (min-width: 790px) {
    flex-direction: row;
    gap: 18px;
  }
`;

const Display = styled.div<{ show?: boolean }>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};

  @media screen and (max-width: 790px) {
    display: ${({ show }) => (show ? 'block' : 'none')};
  }
`;

export function JobDesc({
  title,
  fulltime,
  published,
}: JobDescProps) {
  return (
    <Wrapper>
      <FlexRow>
        <h1>{title}</h1>
        <Display show={fulltime}>
          <Badge>Full time</Badge>
        </Display>
      </FlexRow>
      <Tag icon="schedule" text={published} />
    </Wrapper>
  );
}

export default JobDesc;
