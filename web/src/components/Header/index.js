import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import history from '~/services/history';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, Profile, StyledLink } from './styles';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const currentPathname = history.location.pathname;
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <StyledLink
            to={{
              pathname: '/deliveries',
              selected: currentPathname.localeCompare('/deliveries') === 0,
            }}
          >
            ENCOMENDAS
          </StyledLink>
          <StyledLink
            to={{
              pathname: '/deliverymen',
              selected: currentPathname.localeCompare('/deliverymen') === 0,
            }}
          >
            ENTREGADORES
          </StyledLink>
          <StyledLink
            to={{
              pathname: '/recipients',
              selected: currentPathname.localeCompare('/recipients') === 0,
            }}
          >
            DESTINATÁRIOS
          </StyledLink>
          <StyledLink
            to={{
              pathname: '/problems',
              selected: currentPathname.localeCompare('/problems') === 0,
            }}
          >
            PROBLEMAS
          </StyledLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
