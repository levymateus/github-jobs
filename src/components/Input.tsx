import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export type InputProps = HTMLAttributes<HTMLInputElement>
export interface CheckboxProps extends InputProps {
  label: string
  name?: string
}
export type RadioProps = CheckboxProps

const TypeTextCss = css`
  width: 100%;
  height: 100%;
  min-height: 48px;
  max-width: 790px;
  background-color: #FFF;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  font-weight: normal;
  font-style: normal;
  font-size: 12px;
  line-height: 14.06px;
  padding-left: 16px;
  padding-right: 16px;
  outline: inherit;

  &:hover {
    cursor: text;
  }

  &[placeholder] {
    color: inherit;
    text-overflow:ellipsis;
  }

  &::-webkit-input-placeholder {
    color: inherit;
    text-overflow: ellipsis;
  }

  &::-moz-placeholder {
    color: inherit;
    text-overflow: ellipsis;
  }

  &:-ms-input-placeholder {
    color: inherit;
    text-overflow: ellipsis;
  }

  &:-moz-placeholder {
    color: inherit;
    text-overflow: ellipsis;
  }
`;

const TypeCheckboxCss = css`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  box-sizing: border-box;
  visibility: hidden;

  & + span {
    border-radius: 2px;
  }

  &:checked + span::before {
    border-radius: 2px;
  }
`;

const TypeRadioCss = css`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  box-sizing: border-box;
  visibility: hidden;

  & + span {
    border-radius: 50%;
  }

  &:checked + span::before {
    border-radius: 50%;
  }
`;

const Label = styled.label`
  user-select: none;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #334680;
  display: flex;
  align-items: center;
  position: relative;

  & label {
    position: absolute;
  }

  & input:hover, label:hover {
    cursor: pointer;
  }

  & input + span {
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    left: 5px;
    border: 1px solid #B9BDCF;
    &:hover {
      cursor: pointer;
    }
  }

  & input:checked + span {
    border: 1px solid #1E86FF;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & input:checked + span::before {
    content: "";
    width: 12px;
    height: 12px;
    display: block;
    background-color: #1E86FF;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input<InputProps>`
  ${(props) => props.type === 'text' && TypeTextCss}
  ${(props) => props.type === 'checkbox' && TypeCheckboxCss}
  ${(props) => props.type === 'radio' && TypeRadioCss}
`;

export function Checkbox({
  id, label, name,
}: CheckboxProps) {
  return (
    <Label htmlFor={id}>
      <Input id={id} type="checkbox" name={name} />
      <span />
      {label}
    </Label>
  );
}

export function Radio({
  id, label, name,
}: RadioProps) {
  return (
    <Label htmlFor={id}>
      <Input id={id} type="radio" name={name} />
      <span />
      {label}
    </Label>
  );
}

export default Input;
