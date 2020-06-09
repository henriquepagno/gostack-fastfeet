import React from 'react';
import PropTypes from 'prop-types';

import { Container, Description, Date } from './styles';

export default function ProblemItem({ description, date }) {
  return (
    <Container>
      <Description multiline>{description}</Description>
      <Date>{date}</Date>
    </Container>
  );
}

ProblemItem.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};
