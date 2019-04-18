import { UPDATE_PASSWORD, UPDATE_ERROR } from '../actions/types';

import updatePasswordReducer, { initialState } from './updatePasswordReducer';

describe('updatePasswordReducer tests', () => {
    it('should have an initial state', () => {
        expect(updatePasswordReducer(initialState, {})).toEqual({
            isSent: false, isUpdated: false, message: {}, errors: {},
        });
    });
    it('should set isUpdated to true upon successful update of password', () => {
        expect(updatePasswordReducer(null, {
            type: UPDATE_PASSWORD,
            payload: {}
        }).isUpdated).toEqual(true);
    });
    it('should set isUpdated to false when there is an error is setting new password', () => {
        expect(updatePasswordReducer(null, {
            type: UPDATE_ERROR,
            payload: {}
        }).isUpdated).toEqual(false);
    });
});