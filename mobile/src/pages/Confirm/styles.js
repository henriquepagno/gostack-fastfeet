import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Button from '~/components/Button';

import Colors from '~/styles/Constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 60px;
`;

export const Camera = styled(RNCamera).attrs({})`
  justify-content: flex-end;
  width: 100%;
  height: 80%;
  overflow: hidden;
`;

export const SnapButton = styled(TouchableOpacity)`
  background: ${Colors.gray};
  opacity: 0.5;
  padding: 15px;
  margin-bottom: 25px;
  border-radius: 30px;
  align-self: center;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
  align-self: stretch;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`;
