import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 315px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    color: #444444;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #eee;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #000;
    margin: 0 0 10px;
    width: 100%;

    &::placeholder {
      color: rgba(0, 0, 0, 0.7);
    }
  }

  span {
    color: #d23f3f;
    align-self: center;
    font-size: 12px;
  }
`;
