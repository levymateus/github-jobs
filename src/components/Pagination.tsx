import React, { useState } from 'react';
import { Button } from 'components/Button';
import { IconOutlined } from 'components/IconOutlined';
import styled from 'styled-components';

const MAX_LENGTH = 5;

export type PaginationProps = {
  pageCount: number
  page: number
  onNext: (page: number) => void
  onPrev: (page: number) => void
  onSelect: (page: number) => void
}

const FlexWrapper = styled.div`
  gap: 12px;
  width: 100%;
  display: flex;
  min-width: 375px;
  align-items: center;
`;

export function Pagination({
  pageCount, page, onNext, onPrev, onSelect,
}: PaginationProps) {
  const offset = page - 2 >= 1 ? page - 2 : 1;
  const pagesLength = pageCount > MAX_LENGTH ? MAX_LENGTH - 2 : pageCount;
  const pages = Array.from({ length: pagesLength }).map((_, index) => index + offset);
  const isMore = page < pageCount - 1 && pageCount > MAX_LENGTH;
  const isMoreThanMax = pageCount > MAX_LENGTH;
  return (
    <FlexWrapper>
      <Button
        visible={page > 1}
        variant="outline"
        text=""
        size="small"
        onClick={() => onPrev(page - 1)}
      >
        <IconOutlined size={18}>
          chevron_left
        </IconOutlined>
      </Button>
      {page === pageCount && isMoreThanMax && (
        <Button
          variant="outline"
          text="1"
          active={page === 1}
          size="small"
          onClick={() => onSelect(1)}
        />
      )}
      {!isMore && isMoreThanMax && <IconOutlined size={18} color="#B7BCCE">more_horiz</IconOutlined>}
      {pages.map((value) => (
        value <= pageCount && (
        <Button
          key={String(value)}
          variant="outline"
          text={String(value)}
          active={page === value}
          size="small"
          onClick={() => {
            onSelect(value);
          }}
        />
        )
      ))}
      {isMore && <IconOutlined size={18} color="#B7BCCE">more_horiz</IconOutlined>}
      {page !== pageCount && isMoreThanMax && (
        <Button
          variant="outline"
          text={String(pageCount)}
          active={page === pageCount}
          size="small"
          onClick={() => onSelect(pageCount)}
        />
      )}
      <Button
        visible={page < pageCount}
        variant="outline"
        text=""
        size="small"
        onClick={() => onNext(page + 1)}
      >
        <IconOutlined size={18}>
          chevron_right
        </IconOutlined>
      </Button>
    </FlexWrapper>
  );
}

export default Pagination;
