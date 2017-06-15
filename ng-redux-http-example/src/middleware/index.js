import angular from 'angular';

import http from './http';
import service from './service'

export default angular
  .module('app.middleware', [])
  .factory('httpMiddleware', http)
  .factory('serviceMiddleware', service)
  .name;
