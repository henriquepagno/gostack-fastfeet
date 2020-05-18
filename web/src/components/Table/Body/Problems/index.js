import React from 'react';
import PropTypes from 'prop-types';

import { MdDeleteForever } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs';
import ActionsMenu from '~/components/ActionsMenu';

export default function ProblemsBody({ data, handleOpen, handleDelete }) {
  return (
    <tbody>
      {data.map((problem) => (
        <tr key={problem.id}>
          <td>#{String(`0${problem.delivery.id}`).slice(-2)}</td>
          <td>{problem.description}</td>
          <td>
            <ActionsMenu>
              <button type="button" onClick={() => handleOpen(problem)}>
                <BsEyeFill size={16} color="#8e5be8" />
                <span>Visualizar</span>
              </button>
              <button type="button" onClick={() => handleDelete(problem.id)}>
                <MdDeleteForever size={16} color="#de3b3b" />
                <span>Cancelar encomenda</span>
              </button>
            </ActionsMenu>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

ProblemsBody.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
