import angular from 'angular';

import request from './request';
import feededit from './feededit';
import feedview from './feedview';

export default angular
  .module('app.components', [
    request,
    feedview,
    feededit,
  ])
  .name;
