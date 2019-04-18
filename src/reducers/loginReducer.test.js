import { LOGIN_USER, LOGIN_ERROR, LOGIN_REQUEST } from '../actions/types';

import login, { initialState } from './login';

describe('loginReducer tests', () => {
    it('should have an initial state', () => {
        expect(login(initialState, {})).toEqual({
            user: {}, errors: {}, isLoading: false, success: false,
        });
    });
    it('should set isLoading to true and success to false upon request of login', () => {
        expect(login(null, {
            type: LOGIN_REQUEST,
            isLoading: true, success: false
        })).toEqual({isLoading: true, success: false});
    });
    it('should set isLoading to false and success to true upon login', () => {
        expect(login(null, {
            type: LOGIN_USER,
            isLoading: false, success: true
        })).toEqual({isLoading: false, success: true});
    });
    it('should set isLoading to false and success to false upon login error', () => {
        expect(login(null, {
            type: LOGIN_ERROR,
            isLoading: false, success: false
        })).toEqual({isLoading: false, success: false});
    });
});