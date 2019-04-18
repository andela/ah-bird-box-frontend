import * as types from './types';
import { updatePassword, updateError } from './updatePasswordActions';

describe('updatePasswordAction tests', () => {
    it('should dispatch UPDATE_ERROR', () => {
        expect(updateError({}).type).toEqual(types.UPDATE_ERROR);
    });
    it('should dispatch UPDATE_PASSWORD', () => {
        expect(updatePassword({}).type).toEqual(types.UPDATE_PASSWORD);
    });
});