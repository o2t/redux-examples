export default function RedditPosts ($http) {
  return ({ feed = "all" }) => {
    return $http({
      method: 'get',
      url: `https://www.reddit.com/r/${feed}.json`,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => ({ posts: response.data.data.children }))
  }
}

RedditPosts.$inject = ['$http']