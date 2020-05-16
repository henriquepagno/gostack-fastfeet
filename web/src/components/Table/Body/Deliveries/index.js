import React from 'react';
import PropTypes from 'prop-types';

import { MdDeleteForever } from 'react-icons/md';
import { BsEyeFill, BsPencil } from 'react-icons/bs';
import Avatar from '~/components/Avatar';
import Status from '~/components/Status';
import ActionsMenu from '~/components/ActionsMenu';

import { AvatarWrapper } from './styles';

export default function DeliveriesBody({
  data,
  handleOpen,
  handleEdit,
  handleDelete,
}) {
  return (
    <tbody>
      {data.map((delivery) => (
        <tr key={delivery.id}>
          <td>#{String(`0${delivery.id}`).slice(-2)}</td>
          <td>{delivery.recipient.name}</td>
          <td>
            <AvatarWrapper>
              <Avatar
                url={
                  delivery.deliveryman.avatar
                    ? delivery.deliveryman.avatar.url
                    : null
                }
                name={delivery.deliveryman.name}
              />
              {delivery.deliveryman.name}
            </AvatarWrapper>
          </td>
          <td>{delivery.recipient.city}</td>
          <td>{delivery.recipient.state}</td>
          <td>
            <Status status={delivery.status} />
          </td>
          <td>
            <ActionsMenu>
              <button type="button" onClick={() => handleOpen(delivery)}>
                <BsEyeFill size={16} color="#8e5be8" />
                <span>Visualizar</span>
              </button>
              <button type="button" onClick={() => handleEdit(delivery.id)}>
                <BsPencil size={16} color="#4d85ee" />
                <span>Editar</span>
              </button>
              <button type="button" onClick={() => handleDelete(delivery.id)}>
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
  handleOpen: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
