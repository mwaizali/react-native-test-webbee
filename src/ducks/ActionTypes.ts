import { createAction, Action } from '@reduxjs/toolkit';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const RESET = 'RESET';

interface RequestActions {
  request: () => Action<string>;
  success: <T>(payload: T) => Action<string, T>;
  failure: (error: string) => Action<string, string>;
  reset: () => Action<string>;
  type: string;
}

const makeRequestActions = (base: string): RequestActions => {
  return {
    request: createAction(`${base}_${REQUEST}`),
    success: createAction<T>(`${base}_${SUCCESS}`),
    failure: createAction<string, string>(`${base}_${FAILURE}`),
    reset: createAction(`${base}_${RESET}`),
    type: base,
  };
};

const makeAction = <T>(base: string) => {
  const action = createAction<T>(base);
  return action;
};

export { REQUEST, SUCCESS, FAILURE, makeRequestActions, makeAction };
