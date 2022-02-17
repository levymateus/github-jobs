import styled from 'styled-components';

export const Button = styled.button`
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
    cursor: pointer;
    background-color: #0076fd;
  }
  &:active {
    background-color: #3090fd;
  }
`;

export default Button;
