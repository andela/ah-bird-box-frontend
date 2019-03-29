import { VERIFY_SUCCESS, VERIFY_FAIL, VERIFY_TRIGGER } from './types';
import { verifySuccess, verifyFail, verifyTrigger } from './verifyAction';

describe('verifyAction tests', () => {
    it('should dispatch VERIFY_TRIGGER', () => {
        expect(verifyTrigger({}).type).toEqual(VERIFY_TRIGGER);
    });
    it('should dispatch VERIFY_FAIL', () => {
        expect(verifyFail({}).type).toEqual(VERIFY_FAIL);
    });
    it('should dispatch VERIFY_SUCCESS', () => {
        expect(verifySuccess({}).type).toEqual(VERIFY_SUCCESS);
    });
});