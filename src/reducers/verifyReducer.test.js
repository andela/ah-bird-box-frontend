import { VERIFY_SUCCESS, VERIFY_FAIL, VERIFY_TRIGGER } from '../actions/types';

import verifyReducer, { initialState } from './verifyReducer';

describe('verifyReducer tests', () => {
    it('should have an initial state', () => {
        expect(verifyReducer(initialState, {})).toEqual({
            isLoading: false, isVerified: false, isTriggered: false, failed: false,
        });
    });
    it('should set isLoading to true and isTriggered to true upon verify trigger', () => {
        expect(verifyReducer(null, {
            type:VERIFY_TRIGGER,
            isLoading: true, isTriggered: true
        })).toEqual({isLoading: true, isTriggered: true});
    });
    it('should set isLoading to false and isVerified to true upon successfull verification', () => {
        expect(verifyReducer(null, {
            type:VERIFY_SUCCESS,
            isLoading: false, isVerified: true
        })).toEqual({isLoading: false, isVerified: true});
    });
    it('should set isLoading to false and failed to true upon verification error', () => {
        expect(verifyReducer(null, {
            type:VERIFY_FAIL,
            isLoading: false, failed: true
        })).toEqual({isLoading: false, failed: true});
    });
});