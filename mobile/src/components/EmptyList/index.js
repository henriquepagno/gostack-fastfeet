import React from 'react';
import PropTypes from 'prop-types';

import { Container, Message } from './styles';

export default function EmptyList({ data }) {
  return !data ? (
    <Container>
      <Message>Não há dados</Message>
    </Container>
  ) : (
    <></>
  );
}

EmptyList.propTypes = {
  data: PropTypes.bool.isRequired,
};
