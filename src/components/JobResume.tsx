import React from 'react';
import styled from 'styled-components';
import { Badge } from 'components/Badge';
import { Tag } from 'components/Tag';
import type { Job } from '../types';

export type JobResumeProps = Pick<Job, 'title' | 'fulltime' | 'published'>

const Wrapper = styled.div`
  display: flex;
  background-color: transparent;
  position: relative;
  box-sizing: border-box;
  cursor: default;

  @media screen and (min-width: 790px) {
    width: 100%;
    flex-direction: row;
  }

  @media screen and (max-width: 790px) {
    flex-direction: column;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    width: 100%;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    color: #334680;
    margin-bottom: 8px;
    display: flex;
  }

  @media screen and (min-width: 790px) {
    width: 100%;
  }

`;

const Display = styled.div<{ show?: boolean }>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};

  @media screen and (max-width: 790px) {
    display: ${({ show }) => (show ? 'block' : 'none')};
    margin-bottom: 8px;
  }
`;

export function JobResume({
  title,
  fulltime,
  published,
}: JobResumeProps) {
  const moment = new Date((Date.now() - new Date(published).getTime()));
  return (
    <Wrapper>
      <FlexContainer>
        <h1>{title}</h1>
        <Display show={fulltime}>
          <Badge>Full time</Badge>
        </Display>
      </FlexContainer>
      <Tag
        icon="schedule"
        text={`${moment.getDate()} days ago`}
      />
    </Wrapper>
  );
}

export default JobResume;
