import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './types';
import {
  articlesGetAllSuccess,
} from './listArticles';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const baseUrl = process.env.REACT_APP_BASE_URL;
const getArticlesUrl = `${baseUrl}/articles/`;
describe('The createArticle actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch the articlesGetAllSuccess action', async (done) => {
    moxios.stubRequest(getArticlesUrl, {
      status: 200,
    });

    const returnedAction = [{ type: types.ARTICLES_GET_ALL_SUCCESS }];
    const store = mockStore({});
    await store.dispatch(articlesGetAllSuccess());
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
