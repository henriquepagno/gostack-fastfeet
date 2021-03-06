import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import logo from '~/assets/fastfeet-logo.png';

import { signInRequest } from '~/store/modules/user/actions';

import {
  Background,
  Container,
  LogoImage,
  FormInput,
  SubmitButton,
} from './styles';

import Colors from '~/styles/Constants';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector((state) => state.user.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.purple} />
      <Background>
        <Container>
          <LogoImage source={logo} />
          <FormInput
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          <SubmitButton
            loading={loading}
            onPress={handleSubmit}
            color={Colors.green}
          >
            Entrar no sistema
          </SubmitButton>
        </Container>
      </Background>
    </>
  );
}
