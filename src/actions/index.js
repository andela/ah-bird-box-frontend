import { SIMPLE_ACTION } from './types';

export const simpleAction = text => ({
  payload: text,
  type: SIMPLE_ACTION,
});

export const testAction = () => {};
