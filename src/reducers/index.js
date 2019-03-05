import { combineReducers } from 'redux';
import sampleReducer from './sample';

export default combineReducers({ text: sampleReducer });
