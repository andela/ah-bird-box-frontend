import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const mockStore = (initialState = {}) => configureMockStore([thunk])(initialState);
