import styled from 'styled-components/native';
import { Platform, Image } from 'react-native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Background = styled.View`
  flex: 1;
  background-color: #7d40e7;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const LogoImage = styled(Image).attrs({
  tintColor: '#fff',
})`
  margin-bottom: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
  align-self: stretch;
`;
