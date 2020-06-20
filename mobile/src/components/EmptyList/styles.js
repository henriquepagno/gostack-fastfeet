import styled from 'styled-components/native';

import Colors from '~/styles/Constants';

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
`;

export const Message = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.darkGray};
`;
