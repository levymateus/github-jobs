import React from 'react';
import styled, { css } from 'styled-components';
import {
  HowToApply,
  BackButton,
  Company,
  JobResume,
  Text,
  HTML,
} from 'components';
import { Link } from 'react-router-dom';
import type { Job } from '../types';

export type JobDetailsProps = Job

type SectionProps = {
  name: 'back' | 'job-resume' | 'company' | 'how-to-apply' | 'desc'
}

const Main = styled.main`
  a {
    text-decoration: none;
    cursor: pointer;
  }

  @media screen and (max-width: 790px) {
    display: grid;
    grid-template-columns: 1fr;

    & > section {
      margin-top: 42px;
    }
    section + section {
      margin-top: 32px;
    }
  }

  @media screen and (min-width: 790px) {
    display: grid;
    grid-template-columns: 375px 1fr;
    margin: auto;
    max-width: 1200px;
    grid-column-gap: 32px;
    grid-row-gap: 16px;
  }
`;

const Section = styled.section<SectionProps>`
  @media screen and (min-width: 790px) {
    ${(props) => props.name === 'back' && css`
      grid-column: 1 / 2;
      margin-bottom: 32px;
    `}
    ${(props) => props.name === 'company' && css`
      grid-column: 2 / 3;
    `}
    ${(props) => props.name === 'desc' && css`
      grid-column: 2 / 3;
    `}
    ${(props) => props.name === 'how-to-apply' && css`
      grid-column: 1 / 2;
    `}
    ${(props) => props.name === 'job-resume' && css`
      grid-column: 2 / 3;
    `}
  }
`;

export function JobDetails({
  location,
  company,
  published,
  title,
  src,
  fulltime,
  description,
}: JobDetailsProps) {
  return (
    <Main>
      <Section name="back">
        <Link to="/">
          <BackButton />
        </Link>
      </Section>

      <Section name="how-to-apply">
        <HowToApply
          description="Please email a copy of your resume and online portfolio to <a href='mailto:wes@kasisto.com'>wes@kasisto.com</a> & CC <a href='mailto:eric@kasisto.com'>eric@kasisto.com<a/>"
        />
      </Section>

      <Section name="job-resume">
        <JobResume
          published={published}
          title={title}
          fulltime={fulltime}
        />
      </Section>

      <Section name="company">
        <Company
          location={location}
          name={company}
          src={src || ''}
        />
      </Section>

      <Section name="desc">
        <Text>
          <HTML dangerouslySetInnerHTML={{ __html: description }} />
        </Text>
      </Section>
    </Main>
  );
}

export default JobDetails;
