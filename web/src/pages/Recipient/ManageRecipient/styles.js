import styled from 'styled-components';

export const Content = styled.div`
  margin-top: 20px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 12px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  div {
    margin-right: 15px;
    width: 20%;
  }

  div:first-child {
    width: 60%;
  }

  div:last-child {
    margin-right: 0px;
  }
`;
