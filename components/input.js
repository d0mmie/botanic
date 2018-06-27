import styled from 'styled-components'

export default styled.input`
  border: 0;
  box-sizing: border-box;
  box-shadow: 0 0 0 2px transparent inset, 0 0 0 1px #e0e0e0 inset;
  outline: 0;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
  max-height: 36px;
  padding: 8px!important;
  transition: box-shadow 150ms;
  vertical-align: middle;
  -webkit-appearance: none;
  width: 100%;
  &:focus {
    box-shadow: 0 0 0 2px #039be5 inset, 0 0 0 1px #e0e0e0 inset;
  }
`
