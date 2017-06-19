import angular from 'angular';

import service from './service'

export default angular
  .module('app.middleware', [])
  .factory('serviceMiddleware', service)
  .name;
