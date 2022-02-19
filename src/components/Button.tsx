import React from 'react';
import styled, { css } from 'styled-components';
import { IconProps } from 'components/IconOutlined';

export type ButtonProps = {
  variant?: 'link'
  text: string
  children?: React.ReactElement<IconProps>
}

type BaseButtonProps = Pick<ButtonProps, 'variant'>

const LinkButtonCss = css`
  color: #1E86FF;
  background-color: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  border: none;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DefaultButtonCss = css`
  padding: 14px 48px;
  width: 146px;
  height: 47px;
  background-color: #1E86FF;
  font-family: 'Roboto', sans-serif;
  color: #FFF;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  text-transform: capitalize;

  &:hover{
    background-color: #0076fd;
  }
  &:active {
    background-color: #3090fd;
  }
`;

const BaseButton = styled.button<BaseButtonProps>`
  ${({ variant }) => (variant === 'link' ? LinkButtonCss : DefaultButtonCss)}
  &:hover {
    cursor: pointer;
  }
`;

export function Button({ text, variant, children }: ButtonProps) {
  return (
    <BaseButton variant={variant}>
      {children}
      {text}
    </BaseButton>
  );
}

export default Button;
