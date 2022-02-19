import React from 'react';
import { Button } from 'components/Button';
import { IconOutlined } from 'components/IconOutlined';

export function BackButton() {
  return (
    <Button text="Back to search" variant="link">
      <IconOutlined color="#1E86FF" rotate={180} size={24}>trending_flat</IconOutlined>
    </Button>
  );
}

export default BackButton;
