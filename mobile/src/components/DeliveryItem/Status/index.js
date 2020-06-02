import React from 'react';
import PropTypes from 'prop-types';

import { Container, Checkpoint, Point, Label, Connector } from './styles';

export default function Status({ status }) {
  let withdrawalStatus = false;
  let deliveryStatus = false;

  if (status === 'Delivered') {
    withdrawalStatus = true;
    deliveryStatus = true;
  }

  if (status === 'Withdrawn') {
    withdrawalStatus = true;
  }

  return (
    <Container>
      <Checkpoint>
        <Point reached />
        <Label wrap>Aguardando Retirada</Label>
      </Checkpoint>
      <Connector />
      <Checkpoint>
        <Point reached={withdrawalStatus} />
        <Label>Retirada</Label>
      </Checkpoint>
      <Checkpoint>
        <Point reached={deliveryStatus} />
        <Label>Entregue</Label>
      </Checkpoint>
    </Container>
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};
