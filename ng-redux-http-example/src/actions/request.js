import {bindActionCreators} from 'redux';

//export const REQUEST_POSTS = 'REQUEST_POSTS';
//export const REQUEST_POSTS_SUCCESS = 'REQUEST_POSTS_SUCCESS';
//export const REQUEST_POSTS_ERROR = 'REQUEST_POSTS_ERROR';
//
//export const REQUEST2_POSTS = 'REQUEST2_POSTS';
//export const REQUEST2_POSTS_PENDING = 'REQUEST2_POSTS_PENDING';
//export const REQUEST2_POSTS_FULFILLED = 'REQUEST2_POSTS_FULFILLED';
//export const REQUEST2_POSTS_REJECTED = 'REQUEST2_POSTS_REJECTED';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POSTS_PENDING = 'REQUEST_POSTS_PENDING';
export const REQUEST_POSTS_SUCCESS = 'REQUEST_POSTS_SUCCESS';
export const REQUEST_POSTS_ERROR = 'REQUEST_POSTS_ERROR';


export const REQUEST_CHANGE_FEED = 'REQUEST_CHANGE_FEED';
export const REQUEST_NOOP = 'REQUEST_NOOP';

export function loadPosts (RedditPosts) {
  return (feed = "all") => {
    return {
      type: REQUEST_POSTS,
      service: RedditPosts,
      payload: {
        feed,
      }
    }
  }
}



export function forceHttpError(RedditPosts) {
  const load = loadPosts(RedditPosts)
  return () => load ("all3");
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

export function doNothing (noop) {
  return {
    type: REQUEST_NOOP,
    payload: {
      noop,
    }
  }
}

export default function requestActions($ngRedux, $http, RedditPosts) {
  let actionCreator = {
    loadPosts: loadPosts(RedditPosts),
    forceHttpError: forceHttpError(RedditPosts),
    changeFeed,
    doNothing
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

requestActions.$inject = ['$ngRedux', '$http', 'RedditPosts'];
