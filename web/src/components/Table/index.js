import React from 'react';
import PropTypes from 'prop-types';

import DeliveriesHeader from './Header/Deliveries';

import DeliveriesBody from './Body/Deliveries';

import { Container } from './styles';

export default function Table({ data, handleDelete }) {
  return (
    <Container>
      <DeliveriesHeader />
      <DeliveriesBody data={data} handleDelete={handleDelete} />
    </Container>
  );
}

Table.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
