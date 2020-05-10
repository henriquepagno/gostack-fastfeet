import React from 'react';
import PropTypes from 'prop-types';

import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function SearchInput({ placeholder, handleSearch }) {
  return (
    <Container>
      <MdSearch size={22} color="#b2b2b2" />
      <input
        name="search"
        type="search"
        placeholder={placeholder}
        onKeyPress={(e) =>
          e.key === 'Enter' ? handleSearch(e.target.value) : ''
        }
      />
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
