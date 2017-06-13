import angular from 'angular';

import requestActions from './request';

export default angular
  .module('app.actions', [ 'app.services' ])
  .factory('requestActions', requestActions)
  .name;
