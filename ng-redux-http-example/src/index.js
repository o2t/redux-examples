import angular from 'angular';

// redux
import ngRedux from 'ng-redux';
import rootReducer from './reducers';
import services from './services';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import contracts from './contracts'

const logger = createLogger({
  collapsed: true,
  level: 'info'
});

// angular
import components from './components';
import actions from './actions';
import middleware from './middlewares';
import createDebounce from 'redux-debounced';
import createContractMiddleware from './middlewares/contract';

export default angular
  .module('app', [
    ngRedux,
    components,
    actions,
    middleware,
    services
  ])
  .config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(rootReducer, [
      logger,
      thunkMiddleware,
      'serviceMiddleware',
      createContractMiddleware (contracts),
      createDebounce(),
    ]);
  })
  .name;
