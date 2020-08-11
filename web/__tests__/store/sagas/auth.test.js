import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';

import * as Auth from '~/store/modules/auth/actions';
import { signIn, setToken, signOut } from '~/store/modules/auth/sagas';

import history from '~/services/history';

const apiMock = new MockAdapter(api);

describe('Auth sagas', () => {
  it('Should be able to sign in', async () => {
    const payload = { email: 'test@fastfeet.com', password: 'test123' };
    const dispatch = jest.fn();

    apiMock.onPost('sessions').reply(200, { token: 123, user: 'test' });

    await runSaga({ dispatch }, signIn, { payload }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(Auth.signInSuccess(123, 'test'));
  });

  it('Should fail when api returns error', async () => {
    const payload = { email: 'test@fastfeet.com', password: 'test123' };
    const dispatch = jest.fn();

    apiMock.onPost('sessions').reply(500);

    await runSaga({ dispatch }, signIn, {
      payload,
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(Auth.signFailure());
  });

  it('Should be able to set token', () => {
    const payload = { auth: { token: '123' } };

    setToken({ payload });

    expect(api.defaults.headers.Authorization).toStrictEqual(`Bearer 123`);
  });

  it('Should be able to sign out', () => {
    signOut();

    expect(history.location.pathname).toBe('/');
  });
});
