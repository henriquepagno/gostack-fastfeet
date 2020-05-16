import React from 'react';
import PropTypes from 'prop-types';

import { MdAdd, MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import { Container } from './styles';

export default function PageButton({
  icon,
  label,
  action,
  type,
  form,
  primary = false,
}) {
  function returnIcon() {
    if (icon === 'Add') {
      return <MdAdd size={22} color="#fff" />;
    }
    if (icon === 'Save') {
      return <MdDone size={22} color="#fff" />;
    }
    if (icon === 'Back') {
      return <MdKeyboardArrowLeft size={22} color="#fff" />;
    }

    return null;
  }

  return (
    <Container onClick={action} primary={primary} type={type} form={form}>
      {returnIcon()}
      {label}
    </Container>
  );
}

PageButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.func,
  type: PropTypes.string,
  form: PropTypes.string,
  primary: PropTypes.bool,
};

PageButton.defaultProps = {
  action: null,
  type: null,
  form: null,
  primary: false,
};
