import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import InputMask from 'react-input-mask';

import { Container } from './styles';

export default function Input({ name, label, mask = null, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      {mask ? (
        <InputMask
          mask={mask}
          id="fieldName"
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      ) : (
        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      )}
      {error && <span className="error">{error}</span>}
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  mask: PropTypes.string,
};

Input.defaultProps = {
  name: '',
  label: '',
  mask: '',
};
