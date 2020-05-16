import React from 'react';
import PropTypes from 'prop-types';

import { MdDeleteForever } from 'react-icons/md';
import { BsPencil } from 'react-icons/bs';
import Avatar from '~/components/Avatar';
import ActionsMenu from '~/components/ActionsMenu';

export default function DeliveriesBody({ data, handleEdit, handleDelete }) {
  return (
    <tbody>
      {data.map((deliverymen) => (
        <tr key={deliverymen.id}>
          <td>#{String(`0${deliverymen.id}`).slice(-2)}</td>
          <td>
            <Avatar
              url={deliverymen.avatar ? deliverymen.avatar.url : null}
              name={deliverymen.name}
            />
          </td>
          <td>{deliverymen.name}</td>
          <td>{deliverymen.email}</td>
          <td>
            <ActionsMenu>
              <button type="button" onClick={() => handleEdit(deliverymen.id)}>
                <BsPencil size={16} color="#4d85ee" />
                <span>Editar</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deliverymen.id)}
              >
                <MdDeleteForever size={16} color="#de3b3b" />
                <span>Excluir</span>
              </button>
            </ActionsMenu>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

DeliveriesBody.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
