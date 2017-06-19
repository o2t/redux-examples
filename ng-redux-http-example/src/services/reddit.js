export default function RedditPosts ($http) {
  // the Reddit service expects an input conforming to the 'feed' contract
  return ({ feed = "all" }) => {
    // the Reddit service success output conforms to the 'posts' contract
    const success = response => {
      return {
        posts: response.data.data.children
      }
    }

    // the Reddit service error output conforms to the FSA errors convention
    const rejected = error => {
      return Promise.reject (error)
    }

    // services are expected to return a promise
    return $http({
      method: 'get',
      url: `https://www.reddit.com/r/${feed}.json`,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(success, rejected)
  }
}

RedditPosts.$inject = ['$http']