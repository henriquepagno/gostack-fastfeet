import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Container, AvatarImage, AvatarInitials } from './styles';

export default function Avatar({ source, name, size, style }) {
  function getColor() {
    let newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (newColor.split('').length < 7) {
      newColor += 'f';
    }

    return newColor.substr(0, 7);
  }

  const color = useMemo(() => getColor(), []);

  function getNameInitials(fullName) {
    const allNameInitials = fullName
      .split(' ')
      .map((c) => c.charAt(0).toUpperCase());

    return allNameInitials[0] + allNameInitials[allNameInitials.length - 1];
  }

  const initials = useMemo(() => getNameInitials(name), [name]);

  return (
    <Container style={style} color={color} width={size} height={size}>
      {source ? (
        <AvatarImage source={{ uri: source }} width={size} height={size} />
      ) : (
        <AvatarInitials style={style} color={color}>
          {initials}
        </AvatarInitials>
      )}
    </Container>
  );
}

Avatar.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
};

Avatar.defaultProps = {
  style: null,
};
