import reducer, { INITIAL_STATE } from '~/store/modules/user/reducer';
import * as Auth from '~/store/modules/auth/actions';

describe('User reducers', () => {
  it('SIGN_IN_SUCCESS', () => {
    const state = reducer(INITIAL_STATE, Auth.signInSuccess('123', 'test'));

    expect(state).toStrictEqual({ profile: 'test' });
  });

  it('SIGN_OUT', () => {
    const state = reducer(INITIAL_STATE, Auth.signOut());

    expect(state).toStrictEqual({ profile: null });
  });
});
