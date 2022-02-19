import React from 'react';
import styled from 'styled-components';
import { Search } from 'components/Search';
import { Button } from 'components/Button';

type BannerProps = {
  onSearch?: (search: string) => void
}

const Wrapper = styled.section`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 140px;
  background-position: bottom;

  @media screen and (max-width: 1024px) {
    width: calc(100% - 24px);
    margin: 0px 12px;
    padding: 0px 18px;
    box-sizing: border-box;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1200px;
  }
`;

export function Banner({ onSearch }: BannerProps) {
  return (
    <Wrapper className="bg-img no-repeat">
      <Search
        onClick={onSearch}
        placeholder="Title, companies, expertise or benefits"
      >
        <Button text="submit" />
      </Search>
    </Wrapper>
  );
}

export default Banner;
