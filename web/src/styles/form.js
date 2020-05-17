import styled from 'styled-components';

export const Container = styled.div`
  margin: 50px 400px auto;
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button:first-child {
    margin-right: 15px;
  }
`;
