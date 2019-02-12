import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';

export const history = createHistory();
const enhancers = [];

/** create the saga middleware **/
const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
  routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension({ trace: true }))
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

/** persist configuration for sync with localStorage **/
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modal', 'search']
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer(history)),
  composedEnhancers
);

export const persistor = persistStore(store);

/** then run the saga **/
sagaMiddleware.run(rootSaga);