import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { IconProps } from 'components/IconOutlined';

export type ButtonProps = {
  variant?: 'link' | 'outline'
  size?: 'small' | 'medium'
  active?: boolean
  text: string
  visible?: boolean
  children?: React.ReactElement<IconProps>
} & Pick<HTMLAttributes<HTMLButtonElement>, 'onClick'>

type BaseButtonProps = Pick<ButtonProps, 'variant' | 'size' | 'active' | 'visible'>

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

const OutlineButtonCss = css`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid #B7BCCE;
  color: #B7BCCE;

  &:hover {
    border: 1px solid #1E86FF;
    color: #1E86FF;
  }

  &:active {
    background-color: #1E86FF;
    color: #fff;
  }
`;

const OutlineButtonActiveCss = css`
  background-color: #1E86FF;
  color: #fff;

  &:hover {
    border: 1px solid #1E86FF;
    color: #fff;
  }
`;

const DefaultButtonCss = css`
  padding: 14px 48px;
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

  ${({ variant, active, visible }) => css`
    ${visible ? 'visibility: visible' : 'visibility: hidden'};
    ${variant === 'link' && LinkButtonCss}
    ${variant === 'outline' && OutlineButtonCss}
    ${variant === undefined && DefaultButtonCss}
    ${variant === 'outline' && active && OutlineButtonActiveCss}
  `}

  ${({ size }) => size === 'small' && css`
    width: 36px;
    height: 36px;
  `}

  ${({ size }) => size === 'medium' && css`
    width: 146px;
    height: 47px;
  `}

  &:hover {
    cursor: pointer;
  }
`;

export function Button({
  text,
  variant,
  size,
  active,
  children,
  visible = true,
  onClick,
}: ButtonProps) {
  return (
    <BaseButton
      variant={variant}
      size={size}
      active={active}
      onClick={onClick}
      visible={visible}
    >
      {children}
      {text}
    </BaseButton>
  );
}

export default Button;
