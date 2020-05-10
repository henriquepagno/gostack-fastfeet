import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const deliverymen = [];

export default function Avatar({ url, name }) {
  if (!deliverymen.some((d) => d.name === name)) {
    let newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (newColor.split('').length < 6) newColor += 'f';
    deliverymen.push({ name, color: newColor });
  }

  const color = useMemo(
    () => deliverymen.filter((d) => d.name === name).map((fd) => fd.color),
    [name]
  );

  const { length } = color[0].split('');

  function getNameInitials(fullName) {
    const allNameInitials = fullName
      .split(' ')
      .map((c) => c.charAt(0).toUpperCase());

    return allNameInitials[0] + allNameInitials[allNameInitials.length - 1];
  }

  return (
    <Container color={length < 7 ? `${color}f` : color}>
      {url ? (
        <img src={url} alt="avatar" />
      ) : (
        <span>{getNameInitials(name)}</span>
      )}
    </Container>
  );
}

Avatar.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  url: '',
};
