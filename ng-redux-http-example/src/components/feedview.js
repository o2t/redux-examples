import angular from 'angular';

class FeedView {
  constructor($scope, $ngRedux) {
    let unsubscribe = $ngRedux.connect(state => ({
      feed: state.posts.feed
    }))(this);

    $scope.$on('$destroy', unsubscribe);
  }
}

FeedView.$inject = ['$scope', '$ngRedux'];

export default angular
  .module('app.feedview', [])
  .directive('httpFeedView', () => ({
    restrict: 'E',
    template: `
      <p> ** {{feedView.feed}}</p>
    `,
    controller: 'FeedView',
    controllerAs: 'feedView'
  }))
  .controller('FeedView', FeedView)
  .name;
