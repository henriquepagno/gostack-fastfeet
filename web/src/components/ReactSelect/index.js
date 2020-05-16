import React, { useRef, useEffect } from 'react';
import Select from 'react-select';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SelectInput({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        return ref.state.value ? ref.state.value.value : '';
      },
      clearValue(ref) {
        ref.select.clearValue();
      },
      setValue(ref, value) {
        ref.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <Select defaultValue={defaultValue} ref={selectRef} {...rest} />
      {error && <span className="error">{error}</span>}
    </Container>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

SelectInput.defaultProps = {
  label: '',
};
