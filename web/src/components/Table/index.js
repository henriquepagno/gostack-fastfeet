import React from 'react';
import PropTypes from 'prop-types';

import DeliveriesHeader from './Header/Deliveries';

import DeliveriesBody from './Body/Deliveries';

import { Container } from './styles';

export default function Table({ data, handleOpen, handleEdit, handleDelete }) {
  return (
    <Container>
      <DeliveriesHeader />
      <DeliveriesBody
        data={data}
        handleOpen={handleOpen}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Container>
  );
}

Table.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
