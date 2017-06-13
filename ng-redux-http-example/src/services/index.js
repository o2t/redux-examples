import angular from 'angular'

import reddit from "./reddit"

export default angular
  .module ('app.services', [])
  .factory ('RedditPosts', reddit)
  .name