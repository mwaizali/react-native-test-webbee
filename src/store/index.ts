import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import { enableBatching } from 'redux-batched-actions';
import { createLogger } from 'redux-logger';
import { whiteList } from '../config/ReduxStorage';
import { RootReducer, RootState } from '../ducks';

// check if chrome debugger is on
const isDebuggingInChrome: boolean = __DEV__ && !!window.navigator.userAgent;

// init logger
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

export default function configureStore(onComplete: (store: any) => void) {
  // create list of middleware
  const middlewareList: any[] = [];
  if (__DEV__) {
    // if dev push logger middle ware
    middlewareList.push(logger);
  }

  // init middleware with list
  const middleware = applyMiddleware(...middlewareList);

  // init persist config - set which reducers to save
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: whiteList,
    stateReconciler: autoMergeLevel2,
  };

  // init redux persist reducer
  const persistedReducer = persistReducer(persistConfig, RootReducer);

  // enable dev tools
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // create store with enable batching
  const store = createStore<RootState, any, any, any>(
    enableBatching(persistedReducer),
    composeEnhancers(middleware)
  );

  // set store in window
  if (isDebuggingInChrome) {
    (window as any).store = store;
  }

  // init store with redux persist
  persistStore(store, null, () => onComplete(store));
}
