import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 150;
  background: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

export const Content = styled.div`
  position: fixed;
  background: white;
  width: 450px;
  min-height: 200px;
  height: auto;
  padding: 10px 25px;
  left: calc(50% - 225px);
  top: calc(50% - 200px);
  border-radius: 4px;
  z-index: 151;

  h3 {
    font-weight: bold;
    font-size: 12px;
    line-height: 10px;
    letter-spacing: 0px;
    color: #333;
    margin-bottom: 5px;
    border-top: 1px solid ${lighten(0.25, '#b2b2b2')};
    padding-top: 10px;
    margin-top: 10px;
  }

  h3:first-child {
    border-top: none;
    margin-top: none;
  }

  p {
    line-height: 25px;
    color: #8e8e8e;
  }

  div {
    display: flex;
    flex-direction: row;

    strong {
      line-height: 25px;
      margin-right: 4px;
      color: #666666;
    }
  }

  img {
    margin-top: 10px;
    max-height: 100px;
    max-width: 100%;
  }
`;
