import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './types';
import {
  articleCreationSuccess,
  articleCreationFail,
} from './articlesActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const baseUrl = process.env.REACT_APP_BASE_URL;
const createUrl = `${baseUrl}/articles/`;
describe('The createArticle actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch the articleCreationSuccess action', async (done) => {
    moxios.stubRequest(createUrl, {
      status: 201,
    });

    const returnedAction = [{ type: types.ARTICLES_CREATE_SUCCESS }];
    const store = mockStore({});
    await store.dispatch(articleCreationSuccess());
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });

  it('should dispatch the articleCreationFail action', async (done) => {
    moxios.stubRequest(createUrl, { status: 400, response: 'error message' });

    const returnedAction = [
      { type: types.ARTICLES_CREATE_FAILED, payload: 'error message' },
    ];
    const store = mockStore({});
    await store.dispatch(articleCreationFail('error message'));
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
