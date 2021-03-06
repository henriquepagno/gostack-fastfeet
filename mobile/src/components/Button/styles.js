import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Colors from '~/styles/Constants';

export const Container = styled(RectButton)`
  height: 46px;
  background: ${(props) => props.color};
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${Colors.white};
  font-weight: bold;
  font-size: 16px;
`;
