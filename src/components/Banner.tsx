import React from 'react';
import styled from 'styled-components';
import { Search } from 'components/Search';
import { Button } from 'components/Button';

export type BannerProps = {
  onSearch?: (search: string) => void
}

const Wrapper = styled.div`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 140px;
  background-position: bottom;
  padding: 0px 18px;
  margin: auto;

  @media screen and (max-width: 790px) {
    width: 100%;
    box-sizing: border-box;
  }

  @media screen and (min-width: 790px) {
    max-width: 1200px;
  }
`;

export function Banner({ onSearch }: BannerProps) {
  return (
    <Wrapper className="bg-img no-repeat">
      <Search
        name="Title, companies, expertise or benefits"
        onClick={onSearch}
        placeholder="Title, companies, expertise or benefits"
      >
        <Button text="submit" />
      </Search>
    </Wrapper>
  );
}

export default Banner;
