import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Input } from 'components/Input';
import { IconOutlined } from 'components/IconOutlined';

type SearchProps = {
  placeholder: string
  onClick?: (value: string) => void
  icon?: string
  name?: string
  children?: React.ReactElement<HTMLAttributes<HTMLButtonElement>>
}

const Wrapper = styled.div<{ elevated?: boolean }>`
  width: 100%;
  max-width: 790px;
  position: relative;
  box-sizing: border-box;
  padding: 4px 4px 4px 16px;
  background-color: #FFFF;
  border-radius: 4px;
  display: flex;
  align-items: center;
  outline: none;
  &input[placeholder]{
    color: #B9BDCF;
    text-overflow: ellipsis;
  }
  & input::-webkit-input-placeholder {
    color: #B9BDCF;
    text-overflow: ellipsis;
  }
  & input::-moz-placeholder {
    color: #B9BDCF;
    text-overflow: ellipsis;
  }
  & input:-ms-input-placeholder {
    color: #B9BDCF;
    text-overflow: ellipsis;
  }
  & input:-moz-placeholder {
    color: #B9BDCF;
    text-overflow: ellipsis;
  }
  ${({ elevated }) => (elevated
    ? 'box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);'
    : 'box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);')}
`;

export function Search({
  name,
  placeholder,
  onClick: handleClick,
  icon = 'work_outline',
  children,
}: SearchProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function handleButtonClick(event: React.MouseEvent) {
    event.preventDefault();
    if (inputRef.current && handleClick) {
      handleClick(inputRef.current.value);
    }
  }

  return (
    <Wrapper
      elevated={!!children}
    >
      <IconOutlined size={18} inative>{icon}</IconOutlined>
      <Input
        name={name}
        type="text"
        ref={inputRef}
        placeholder={placeholder}
      />
      {children && React.cloneElement(React.Children.only(children), {
        role: 'button',
        onClick: handleButtonClick,
      })}
    </Wrapper>
  );
}

export default Search;
