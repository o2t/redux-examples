import {bindActionCreators} from 'redux';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POSTS_SUCCESS = 'REQUEST_POSTS_SUCCESS';
export const REQUEST_POSTS_ERROR = 'REQUEST_POSTS_ERROR';

export const REQUEST2_POSTS = 'REQUEST2_POSTS';
export const REQUEST2_POSTS_PENDING = 'REQUEST2_POSTS_PENDING';
export const REQUEST2_POSTS_FULFILLED = 'REQUEST2_POSTS_FULFILLED';
export const REQUEST2_POSTS_REJECTED = 'REQUEST2_POSTS_REJECTED';


export const REQUEST_CHANGE_FEED = 'REQUEST_CHANGE_FEED';
export const REQUEST_NOOP = 'REQUEST_NOOP';

export function loadPosts2 ($http) {
  return (reddit = "all") => {
    return {
      type: REQUEST2_POSTS,
      payload: $http({
        method: 'get',
        url: `https://www.reddit.com/r/${reddit}.json`,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => res.data)
    }
  }
}

export function loadPosts(reddit = 'all') {
  return {
    // Types of actions to emit before and after
    types: ['REQUEST_POSTS', 'REQUEST_POSTS_SUCCESS', 'REQUEST_POSTS_ERROR'],

    // Check the cache (optional):
    shouldCallAPI: (state) => !state.posts.data,

    // Configure $http
    config: {
      method: 'get',
      url: `https://www.reddit.com/r/${reddit}.json`,
    },

    // Metadata to inject in begin/end actions
    meta: {
      timestamp: Date.now()
    }
  };
}

export function forceHttpError() {
  return {
    types: ['REQUEST_POSTS', 'REQUEST_POSTS_SUCCESS', 'REQUEST_POSTS_ERROR'],
    config: {
      method: 'get',
      url: `https://www.reddit.com/r/garbagejunkredditidontexist.json`,
    }
  };
}

export function changeFeed (feed) {
  return {
    type: REQUEST_CHANGE_FEED,
    payload: feed,
    meta: {
      debounce: {
        time: 300
      }
    }
  }
}

export function doNothing () {
  return {
    type: REQUEST_NOOP
  }
}

export default function requestActions($ngRedux, $http) {
  let actionCreator = {
    loadPosts,
    loadPosts2: loadPosts2($http),
    forceHttpError,
    changeFeed,
    doNothing
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

requestActions.$inject = ['$ngRedux', '$http'];
