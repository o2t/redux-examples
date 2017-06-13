import angular from 'angular';

// redux
import ngRedux from 'ng-redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';

const logger = createLogger({
  collapsed: true,
  level: 'info'
});

// angular
import components from './components';
import actions from './actions';
import middleware from './middleware';
import createDebounce from 'redux-debounced';

export default angular
  .module('app', [
    ngRedux,
    components,
    actions,
    middleware
  ])
  .config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(rootReducer, [
      logger,
      //promiseMiddleware,
      thunkMiddleware,
      'httpMiddleware',
      createDebounce()
    ]);
  })
  .name;
