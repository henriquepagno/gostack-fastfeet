import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Button from '~/components/Button';
import Input from '~/components/Input';

import Colors from '~/styles/Constants';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
  keyboardVerticalOffset: -500,
})`
  flex: 1;
  align-items: center;
  padding: 0 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 5px;
  border: 1px solid ${Colors.lightGray};
  height: 260px;
  min-height: 20px;
  align-items: flex-start;
  padding: 10px 10px;
  margin-top: 60px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
  align-self: stretch;
`;
