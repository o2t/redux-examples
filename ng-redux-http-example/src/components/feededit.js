import angular from 'angular';

class FeedEdit {
  constructor($scope) {
  }

  inputChanged () {
    this.onFeedChange ({ $event: this.feed})
  }
}

FeedEdit.$inject = ['$scope'];

export default angular
  .module('app.feededit', [])
  .component('httpFeedEdit', {
    bindings: {
      "feed": "<",
      "onFeedChange": "&"
    },
    template: `
      <input type="text" ng-model="feedEdit.feed" ng-change="feedEdit.inputChanged()" placeholder="Feed">
    `,
    controller: 'FeedEdit',
    controllerAs: 'feedEdit'
  })
  .controller('FeedEdit', FeedEdit)
  .name;
