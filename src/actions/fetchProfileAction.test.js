import moxios from 'moxios';
import { REQUEST_PROFILES_SUCCESS, REQUEST_PROFILES_FAILURE } from './types';
import { mockStore } from '../config/testHelpers';
import { profiles } from './fetchProfileAction';

describe('profiles', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should get user profile after successfull HTTP call', () => {
    const mockHttpResponse = {
      status: 200,
      data: { status: 200 },
    };
    const expectedActions = [
      {
        type: REQUEST_PROFILES_SUCCESS,
      },
      {
        type: REQUEST_PROFILES_SUCCESS,
        payload: mockHttpResponse,
      },
    ];
    const store = mockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      return request.resolve({
        status: 201,
        response: mockHttpResponse,
      });
    });
    const userData = {
      username: 'testUser',
    };
    store.dispatch(profiles(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fail to get user details after unsuccessfull HTTP call', () => {
    const mockHttpResponse = {
      status: 400,
      response: { status: 400, data: { errors: [] } },
    };
    const expectedActions = [
      {
        type: REQUEST_PROFILES_FAILURE,
      },
      {
        type: REQUEST_PROFILES_FAILURE,
        errors: mockHttpResponse.response.data.errors,
      },
    ];
    const store = mockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      return request.reject({
        status: 400,
        response: mockHttpResponse,
      });
    });
    const userData = {
      username: 'testUser',
    };
    store.dispatch(profiles(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
