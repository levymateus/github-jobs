import React, { useState } from 'react';
import styled from 'styled-components';
import { Span } from 'components/Typo';

export type AvatarProps = {
  src?: string
  size?: 'small' | 'medium'
}

const getSize = (props: AvatarProps): number => (props.size === 'small' ? 42 : 90);

const Wrapper = styled.div<AvatarProps>`
  width: ${getSize}px;
  height: ${getSize}px;
  border-radius: 4px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const Empty = styled.div`
  width: inherit;
  height: inherit;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F2F2;
`;

export function Avatar({ src, size }: AvatarProps) {
  const [error, setError] = useState(false);
  const message = !src || error ? <Span>not found</Span> : '';

  return (
    <Wrapper size={size}>
      {!message
        ? <Image src={src} onError={() => setError(true)} />
        : <Empty>{message}</Empty>}
    </Wrapper>
  );
}

export default Avatar;
