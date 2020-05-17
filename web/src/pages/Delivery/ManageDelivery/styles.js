import styled from 'styled-components';

export const Content = styled.div`
  margin-top: 20px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  div.select-container {
    display: flex;
    width: 100%;
    justify-content: space-between;

    div#select {
      width: 100%;
      padding-right: 15px;
    }

    div#select + div#select {
      padding-right: 0;
      padding-left: 15px;
    }
  }

  label {
    font-size: 12px;
  }
`;
