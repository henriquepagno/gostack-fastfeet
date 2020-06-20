import styled from 'styled-components/native';

import Colors from '~/styles/Constants';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin: 20px 10px;
`;

export const Checkpoint = styled.View`
  flex-direction: column;
  align-items: center;
  background: transparent;
  position: relative;
`;

export const Label = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${Colors.darkGray};
  width: 70px;
  justify-content: center;
  text-align: center;
`;

export const Point = styled.View`
  width: 12px;
  height: 12px;
  background: ${({ reached }) => (reached ? Colors.purple : Colors.white)};
  border: 1px solid ${Colors.purple};
  border-radius: 11px;
`;

export const Connector = styled.View`
  padding: 0 50px;
  background: ${Colors.purple};
  width: 78%;
  height: 1px;
  top: 5.5px;
  left: 35px;
  z-index: -1;
  position: absolute;
`;
