import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { StatusBar, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '~/services/api';

import {
  StackBackground as Background,
  HeaderBackground,
} from '~/styles/globals';
import {
  Container,
  InfoContainer,
  TitleContainer,
  Title,
  Label,
  DatesContainer,
  Data,
  DateContainer,
  ButtonContainer,
  Button,
  ButtonText,
} from './styles';

import Colors from '~/styles/Constants';

export default function Detail({ navigation }) {
  const profile = useSelector((state) => state.user.profile);

  const delivery = navigation.getParam('item');
  const refreshList = navigation.getParam('refreshList');

  const [status, setStatus] = useState('');
  const [confirmDescription, setConfirmDescription] = useState('');
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    if (delivery.end_date) {
      setStatus('Entregue');
      setConfirmDescription('Produto Entregue');
      setDelivered(true);
      return;
    }

    if (delivery.start_date) {
      setStatus('Retirada');
      setConfirmDescription('Confirmar Entrega');
      return;
    }

    setStatus('Pendente');
    setConfirmDescription('Confirmar Retirada');
  }, [status, delivery.end_date, delivery.start_date]);

  function handleNewProblem() {
    if (delivery.end_date) return;

    const { id: deliveryId } = delivery;
    navigation.navigate('NewProblem', { deliveryId });
  }

  function handleProblem() {
    const { id: deliveryId } = delivery;
    navigation.navigate('Problem', { deliveryId });
  }

  async function handleConfirm() {
    if (delivery.end_date) return;

    if (delivery.start_date) {
      navigation.navigate('Confirm', { id: delivery.id });
      return;
    }

    try {
      await api.put(`/deliveries/withdrawal/${delivery.id}`, {
        deliverymanId: profile.id,
        date: new Date(),
      });

      Alert.alert(
        'Encomenda retirada com sucesso.',
        'Entre em contato se houver algum problema'
      );

      refreshList();
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Falha ao retirar encomenda.',
        err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor'
      );
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.purple} />
      <Background>
        <HeaderBackground />

        <Container>
          <InfoContainer>
            <TitleContainer>
              <Icon name="truck" size={28} color={Colors.purple} />
              <Title>Informações da entrega</Title>
            </TitleContainer>
            <Label>Destinatário</Label>
            <Data>{delivery.recipient.name}</Data>
            <Label>Endereço de Entrega</Label>
            <Data>
              {delivery.recipient.street}, {delivery.recipient.number},{' '}
              {delivery.recipient.city} - {delivery.recipient.state},{' '}
              {delivery.recipient.formatted_zipcode}
            </Data>
            <Label>Produto</Label>
            <Data>{delivery.product}</Data>
          </InfoContainer>

          <InfoContainer>
            <TitleContainer>
              <Icon name="calendar" size={28} color={Colors.purple} />
              <Title>Situação da entrega</Title>
            </TitleContainer>
            <Label>Status</Label>
            <Data>{status}</Data>
            <DatesContainer>
              <DateContainer>
                <Label>Data de Retirada</Label>
                <Data>{delivery.formattedStartDate}</Data>
              </DateContainer>
              <DateContainer>
                <Label>Data de Entrega</Label>
                <Data>{delivery.formattedEndDate}</Data>
              </DateContainer>
            </DatesContainer>
          </InfoContainer>

          <ButtonContainer>
            <Button
              disabled={delivered}
              onPress={() => {
                handleNewProblem();
              }}
            >
              <Icon name="close-circle-outline" color={Colors.red} size={28} />
              <ButtonText>Informar Problema</ButtonText>
            </Button>
            <Button
              onPress={() => {
                handleProblem();
              }}
            >
              <Icon
                name="information-outline"
                color={Colors.yellow}
                size={28}
              />
              <ButtonText>Visualizar Problemas</ButtonText>
            </Button>
            <Button
              disabled={delivered}
              onPress={() => {
                handleConfirm();
              }}
            >
              <Icon
                name="check-circle-outline"
                color={Colors.purple}
                size={28}
              />
              <ButtonText>{confirmDescription}</ButtonText>
            </Button>
          </ButtonContainer>
        </Container>
      </Background>
    </>
  );
}

Detail.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da encomenda',
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

Detail.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
