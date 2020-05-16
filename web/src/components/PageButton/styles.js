import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  background: ${(props) => (props.primary ? '#8e5be8' : '#b2b2b2')};
  color: #fff;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px #eee solid;
  font-weight: bold;
  font-size: 12px;
  padding: 8px 15px;

  &:hover {
    background: ${(props) =>
      props.primary ? darken(0.06, '#8e5be8') : darken(0.06, '#b2b2b2')};
  }

  svg {
    margin-right: 5px;
  }
`;
