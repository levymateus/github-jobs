import React from 'react';
import { Span } from 'components/Typo';
import { IconOutlined } from 'components/IconOutlined';

export type TagProps = {
  text: string
  icon: string
}

export function Tag({ text, icon }: TagProps) {
  return (
    <Span>
      <IconOutlined inative size={15}>{icon}</IconOutlined>
      <p>{text}</p>
    </Span>
  );
}

export default Tag;
