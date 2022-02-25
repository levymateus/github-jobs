import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'components/Avatar';
import { Badge } from 'components/Badge';
import { Tag } from 'components/Tag';
import type { Job } from '../types';

export type JobCardProps = Job

const Wrapper = styled.div`
  padding: 12px;
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  @media screen and (min-width: 790px) {
    width: 100%;
  }

  @media screen and (min-width: 790px) and (max-width: 1200px) {
    width: 512px;
  }

  @media screen and (min-width: 1200px) {
    width: 790px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  padding-left: 16px;
  flex-direction: column;

  @media screen and (min-width: 790px) {
    width: 100%;
  }
`;

const FlexTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

const JobInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: fit-content;

  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    line-height: 14.06px;
    color: #334680;
    margin-bottom: 8px;
  }

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #334680;
    margin-bottom: 12px;
    display: flex;
  }
`;

const JobDetails = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;

  @media screen and (min-width: 790px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Display = styled.div<{ show?: boolean }>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};

  @media screen and (max-width: 790px) {
    display: ${({ show }) => (show ? 'block' : 'none')};
    margin-bottom: 24px;
  }
`;

export function JobCard({
  src,
  company,
  title,
  fulltime,
  location,
  published,
}: JobCardProps) {
  const moment = new Date((Date.now() - new Date(published).getTime()));
  return (
    <Wrapper>
      <Avatar src={src} size="medium" />
      <FlexContainer>
        <JobInfo>
          <h2>{company}</h2>
          <h1>{title}</h1>
        </JobInfo>
        <JobDetails>
          <Display show={fulltime}>
            <Badge>Full time</Badge>
          </Display>
          <FlexTags>
            <Tag icon="public" text={location.join(', ')} />
            <Tag icon="schedule" text={`${moment.getDate()} days ago`} />
          </FlexTags>
        </JobDetails>
      </FlexContainer>
    </Wrapper>
  );
}

export default JobCard;
