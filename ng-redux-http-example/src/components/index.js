import angular from 'angular';

import request from './request';
import feededit from './feededit';
import feedview from './feedview';
import feedparent from './feedparent';

export default angular
  .module('app.components', [
    request,
    feedview,
    feededit,
    feedparent
  ])
  .name;
