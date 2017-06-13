export default function RedditPosts ($http) {
  return ({ reddit = "all" }) => {
    return $http({
      method: 'get',
      url: `https://www.reddit.com/r/${reddit}.json`,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.data)
  }
}

RedditPosts.$inject = ['$http']