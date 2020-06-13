import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  StackBackground as Background,
  HeaderBackground,
} from '~/styles/globals';
import { Container, FormInput, SubmitButton } from './styles';

import Colors from '~/styles/Constants';

export default function NewProblem({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');

  const [description, setDescription] = useState();

  async function handleSubmit() {
    try {
      await api.post(`/delivery/${deliveryId}/problems`, {
        description,
      });

      Alert.alert('Sucesso.', 'Problema cadastrado com sucesso');
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Falha ao cadastrar problema.',
        err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor'
      );
    }
  }

  return (
    <Background>
      <HeaderBackground />

      <Container>
        <FormInput
          placeholder="Inclua aqui o problema que ocorreu na entrega."
          returnKeyType="send"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <SubmitButton color={Colors.purple} onPress={handleSubmit}>
          Enviar
        </SubmitButton>
      </Container>
    </Background>
  );
}

NewProblem.navigationOptions = ({ navigation }) => ({
  title: 'Informar problema',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color={Colors.white} />
    </TouchableOpacity>
  ),
});

NewProblem.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
