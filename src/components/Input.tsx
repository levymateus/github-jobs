import styled from 'styled-components';

export const Input = styled.input`
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
  &[placeholder]{
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

export default Input;
