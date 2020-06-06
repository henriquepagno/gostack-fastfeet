import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Status from './Status';

import {
  Container,
  TitleContainer,
  Title,
  InfoContainer,
  DataContainer,
  Label,
  Data,
  DetailsButton,
  DetailsButtonText,
} from './styles';

import Colors from '~/styles/Constants';

export default function DeliveryItem({ data, onPressDetails }) {
  return (
    <Container>
      <TitleContainer>
        <Icon name="truck" size={30} color={Colors.purple} />
        <Title>Encomenda {String(`0${data.id}`).slice(-2)}</Title>
      </TitleContainer>

      <Status status={data.status} />

      <InfoContainer>
        <DataContainer>
          <Label>Data</Label>
          <Data>{data.formattedDate}</Data>
        </DataContainer>
        <DataContainer>
          <Label>Cidade</Label>
          <Data>{data.recipient.city}</Data>
        </DataContainer>
        <DetailsButton onPress={() => onPressDetails()}>
          <DetailsButtonText>Ver detalhes</DetailsButtonText>
        </DetailsButton>
      </InfoContainer>
    </Container>
  );
}

DeliveryItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onPressDetails: PropTypes.func.isRequired,
};
