import angular from 'angular';

class FeedParent {
  constructor($scope, $ngRedux, requestActions) {
    let unsubscribe = $ngRedux.connect(state => ({
      feed: state.posts.feed
    }))(this);

    $scope.$on('$destroy', unsubscribe);
    this.requestActions = requestActions
  }

  updateFeed ($event) {
    this.requestActions.changeFeed ({ feed: $event });
  }
}

FeedParent.$inject = ['$scope', '$ngRedux', 'requestActions'];

export default angular
  .module('app.feedparent', [])
  .component('httpFeedParent', {
    template: `
      <http-feed-view feed='feedParent.feed'></http-feed-view>
      <http-feed-edit feed='feedParent.feed' on-feed-change='feedParent.updateFeed($event)'></http-feed-edit>
    `,
    controller: 'FeedParent',
    controllerAs: 'feedParent'
  })
  .controller('FeedParent', FeedParent)
  .name;
