import React from 'react';
import PropTypes from 'prop-types';

import { MdDeleteForever } from 'react-icons/md';
import { BsPencil } from 'react-icons/bs';
import ActionsMenu from '~/components/ActionsMenu';

export default function RecipientsBody({ data, handleEdit, handleDelete }) {
  return (
    <tbody>
      {data.map((recipients) => (
        <tr key={recipients.id}>
          <td>#{String(`0${recipients.id}`).slice(-2)}</td>
          <td>{recipients.name}</td>
          <td>{recipients.name}</td>
          <td>
            <ActionsMenu>
              <button type="button" onClick={() => handleEdit(recipients.id)}>
                <BsPencil size={16} color="#4d85ee" />
                <span>Editar</span>
              </button>
              <button type="button" onClick={() => handleDelete(recipients.id)}>
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

RecipientsBody.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
