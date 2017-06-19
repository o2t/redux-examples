export default function RedditPosts ($http) {
  return ({ feed = "all" }) => {
    const success = response => ({ posts: response.data.data.children });
    const rejected = error => (Promise.reject(error))
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