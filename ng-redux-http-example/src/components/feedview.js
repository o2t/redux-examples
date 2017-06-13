import angular from 'angular';

class FeedView {
  constructor($scope) {
  }
}

FeedView.$inject = ['$scope'];

export default angular
  .module('app.feedview', [])
  .component('httpFeedView', {
    bindings: {
      "feed": "<"
    },
    template: `
      <p> ** {{feedView.feed}}</p>
    `,
    controller: 'FeedView',
    controllerAs: 'feedView'
  })
  .controller('FeedView', FeedView)
  .name;
