import reducer, { INITIAL_STATE } from '~/store/modules/auth/reducer';
import * as Auth from '~/store/modules/auth/actions';

describe('Auth reducers', () => {
  it('SIGN_IN_REQUEST', () => {
    const state = reducer(
      INITIAL_STATE,
      Auth.signInRequest('test@fastfeet.com', 'test123')
    );

    expect(state).toStrictEqual({ loading: true, signed: false, token: null });
  });

  it('SIGN_IN_SUCCESS', () => {
    const state = reducer(INITIAL_STATE, Auth.signInSuccess('123', 'test'));

    expect(state).toStrictEqual({
      token: '123',
      signed: true,
      loading: false,
    });
  });

  it('SIGN_FAILURE', () => {
    const state = reducer(INITIAL_STATE, Auth.signFailure());

    expect(state).toStrictEqual({
      loading: false,
      signed: false,
      token: null,
    });
  });

  it('SIGN_OUT', () => {
    const state = reducer(INITIAL_STATE, Auth.signOut());

    expect(state).toStrictEqual({
      token: null,
      signed: false,
      loading: false,
    });
  });
});
