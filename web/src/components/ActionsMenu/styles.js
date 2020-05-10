import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const ButtonWrapper = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const ActionList = styled.div`
  position: absolute;
  background: #fff;
  width: 150px;
  left: calc(50% - 90px);
  top: calc(100% + 5px);
  border-radius: 4px;
  padding: 15px 5px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.149);
  z-index: 101;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% + 7px);
    top: 3px;
    width: 0;
    height: 0;
    box-sizing: border-box;
    border: 6px solid black;
    border-color: transparent transparent white white;
    transform-origin: 0 0;
    transform: rotate(-225deg);
    box-shadow: -3px 3px 4px -1px #0000001a;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: left;

  button {
    display: flex;
    border: none;
    background: white;
    border-bottom: 1px solid ${lighten(0.25, '#b2b2b2')};
    width: 90%;
    padding: 5px;

    svg {
      margin-right: 10px;
    }

    span {
      color: #b2b2b2;

      &:hover {
        color: ${darken(0.09, '#b2b2b2')};
      }
    }
  }

  button:last-child {
    border-bottom: none;
  }
`;
