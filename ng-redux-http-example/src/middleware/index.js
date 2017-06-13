import angular from 'angular';

import http from './http';
import service from './serviceMiddleware'

export default angular
  .module('app.middleware', [])
  .factory('httpMiddleware', http)
  .factory('serviceMiddleware', service)
  .name;
