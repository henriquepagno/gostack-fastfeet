import React from 'react';
import PropTypes from 'prop-types';

import DeliveriesHeader from './Header/Deliveries';
import DeliverymenHeader from './Header/Deliverymen';

import DeliveriesBody from './Body/Deliveries';
import DeliverymenBody from './Body/Deliverymen';

import { Container } from './styles';

export default function Table({
  type,
  data,
  handleOpen,
  handleEdit,
  handleDelete,
}) {
  return (
    <Container>
      {type === 'Deliveries' && (
        <>
          <DeliveriesHeader />
          <DeliveriesBody
            data={data}
            handleOpen={handleOpen}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {type === 'Deliverymen' && (
        <>
          <DeliverymenHeader />
          <DeliverymenBody
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
    </Container>
  );
}

Table.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleOpen: PropTypes.func,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

Table.defaultProps = {
  handleOpen: null,
};
