import * as types from './types';
import { provideEmail, requestEmail, emailError } from './resetPasswordActions';

describe('Trigger password reset', () => {
  it('should dispatch PROVIDE_EMAIL', () => {
    expect(provideEmail({}).type).toEqual(types.PROVIDE_EMAIL);
  });
  it('should dispatch REQUEST_EMAIL', () => {
    expect(requestEmail({}).type).toEqual(types.REQUEST_EMAIL);
  });
  it('should dispatch EMAIL_ERROR', () => {
    expect(emailError({}).type).toEqual(types.EMAIL_ERROR);
  });
});
