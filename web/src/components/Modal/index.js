import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useVisibleHandler from '~/helpers/hooks/useVisibleHandler';

import { Container, Content } from './styles';

export default function Modal({ visible, setVisible, children }) {
  const modalRef = useRef();

  useVisibleHandler(
    modalRef,
    () => {
      if (visible) {
        setVisible(false);
      }
    },
    true
  );

  return (
    <Container ref={modalRef} visible={visible}>
      <Content>{children}</Content>
    </Container>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Modal.defaultProps = {
  children: '',
};
