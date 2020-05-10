import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin-right: 5px;
  width: 35px;
  height: 35px;
  background: #b2b2b2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => `${darken(0.09, `${color}`)}`};
  background: ${({ color }) => `${color}33`};

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;
