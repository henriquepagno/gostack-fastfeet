import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Checkpoint, Point, Label, Connector } from './styles';

export default function Status({ status }) {
  const [withdrawalStatus, setWithdrawalStatus] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  useEffect(() => {
    if (status === 'Delivered') {
      setWithdrawalStatus(true);
      setDeliveryStatus(true);
    }

    if (status === 'Withdrawn') {
      setWithdrawalStatus(true);
    }
  }, [status]);

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
