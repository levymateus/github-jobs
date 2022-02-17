import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 100%;
  min-height: 48px;
  max-width: 790px;
  background-color: #FFF;
  border-radius: 4px;
  border: none;
  color: inherit;
  box-sizing: border-box;
  font-weight: normal;
  font-style: normal;
  font-size: 12px;
  line-height: 14.06px;
  padding-left: 16px;
  padding-right: 16px;
  &[placeholder]{
    text-overflow:ellipsis;
  }
  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    text-overflow:ellipsis;
  }
  &::-moz-placeholder { /* Firefox 19+ */
    text-overflow:ellipsis;
  }
  &:-ms-input-placeholder { /* IE 10+ */
    text-overflow:ellipsis;
  }
  &:-moz-placeholder { /* Firefox 18- */
    text-overflow:ellipsis;
  }
`;

export default Input;
