import angular from 'angular';

class FeedEdit {
  constructor($scope, $ngRedux, requestActions) {
    let unsubscribe = $ngRedux.connect(state => ({
      feed: state.posts.feed
    }))(this);

    $scope.$on('$destroy', unsubscribe);
    this.requestActions = requestActions
  }

  updateFeed () {
    this.requestActions.changeFeed ({ feed: this.feed });
  }
}

FeedEdit.$inject = ['$scope', '$ngRedux', 'requestActions'];

export default angular
  .module('app.feededit', [])
  .directive('httpFeedEdit', () => ({
    restrict: 'E',
    template: `
      <input type="text" ng-model="feedEdit.feed" placeholder="Feed" ng-change="feedEdit.updateFeed()">
    `,
    controller: 'FeedEdit',
    controllerAs: 'feedEdit'
  }))
  .controller('FeedEdit', FeedEdit)
  .name;
