import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { BsThreeDots } from 'react-icons/bs';
import useActionsMenuVisible from '~/helpers/hooks/useActionsMenuVisible';

import {
  Container,
  ButtonWrapper,
  ActionList,
  ActionContainer,
} from './styles';

export default function ActionsMenu({ children }) {
  const actionsMenuRef = useRef();
  const [visible, setVisible] = useState(false);

  useActionsMenuVisible(actionsMenuRef, () => {
    if (visible) {
      setVisible(false);
    }
  });

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container ref={actionsMenuRef}>
      <ButtonWrapper onClick={handleToggleVisible}>
        <BsThreeDots size={22} color="#b2b2b2" />
      </ButtonWrapper>

      <ActionList visible={visible}>
        <ActionContainer>{children}</ActionContainer>
      </ActionList>
    </Container>
  );
}

ActionsMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
