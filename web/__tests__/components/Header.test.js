import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';

import history from '~/services/history';

import Header from '~/components/Header';

import { signOut } from '~/store/modules/auth/actions';

jest.mock('react-redux');

describe('Header component', () => {
  it('Should navigate to deliveries', () => {
    useSelector.mockImplementation((callback) =>
      callback({
        user: {
          profile: {
            name: 'Teste',
          },
        },
      })
    );

    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    fireEvent.click(getByText('ENCOMENDAS'));

    expect(history.location.pathname).toBe('/deliveries');
  });

  it('Should navigate to deliverymen', () => {
    useSelector.mockImplementation((callback) =>
      callback({
        user: {
          profile: {
            name: 'Teste',
          },
        },
      })
    );

    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    fireEvent.click(getByText('ENTREGADORES'));

    expect(history.location.pathname).toBe('/deliverymen');
  });

  it('Should navigate to recipients', () => {
    useSelector.mockImplementation((callback) =>
      callback({
        user: {
          profile: {
            name: 'Teste',
          },
        },
      })
    );

    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    fireEvent.click(getByText('DESTINATÁRIOS'));

    expect(history.location.pathname).toBe('/recipients');
  });

  it('Should navigate to problems', () => {
    useSelector.mockImplementation((callback) =>
      callback({
        user: {
          profile: {
            name: 'Teste',
          },
        },
      })
    );

    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    fireEvent.click(getByText('PROBLEMAS'));

    expect(history.location.pathname).toBe('/problems');
  });

  it('Should sign out', async () => {
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    const buttonElement = getByText('Sair do sistema');

    fireEvent.click(buttonElement);

    expect(dispatch).toHaveBeenCalledWith(signOut());
  });
});
