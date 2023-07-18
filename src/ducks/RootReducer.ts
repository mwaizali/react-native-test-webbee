import {combineReducers} from 'redux';

import machineCategories from './machineCategories';
const appReducer = combineReducers({
  machineCategories,
});

export default appReducer;
