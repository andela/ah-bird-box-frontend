import { REGISTER_SUCCESS, REGISTER_FAILED, REGISTER_TRIGGER } from '../types';

import { registerSuccess, registerFail, registerTrigger } from '../registerAction';

describe('Test on registration process', () => {
  it('should dispatch fetchSingleFail', () => {
    expect(registerSuccess({}).type).toEqual(REGISTER_SUCCESS);
  });
  it('should dispatch fetchSingleSuccess', () => {
    expect(registerFail({}).type).toEqual(REGISTER_FAILED);
  });
  it('should dispatch startUpdate', () => {
    expect(registerTrigger({}).type).toEqual(REGISTER_TRIGGER);
  });
});
