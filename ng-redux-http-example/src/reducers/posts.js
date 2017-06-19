import {
  REQUEST_CHANGE_FEED, REQUEST_NOOP,
  REQUEST_POSTS_PENDING, REQUEST_POSTS_SUCCESS, REQUEST_POSTS_ERROR,
} from '../actions/request';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null,
  feed: "all"
};

export default function posts(state = INITIAL_STATE, action) {
  const { payload, error } = action;

  var actions = {
    [REQUEST_CHANGE_FEED]: (state) => ({
      ...state,
      feed: payload.feed
    }),
    [REQUEST_NOOP]: (state) => {
      console.log (`noop ${payload.noop}`)
      return state
    },

    [REQUEST_POSTS_PENDING]: (state) => ({
      ...state,
      isFetching: true,
      error: false
    }),
    [REQUEST_POSTS_SUCCESS]: (state) => ({
      ...state,
      isFetching: false,
      data: payload.posts
    }),
    [REQUEST_POSTS_ERROR]: (state) => ({
      ...state,
      isFetching: false,
      error: `error ${error.status}: ${error.statusText}`
    }),
  };

  return actions[action.type] ?
    actions[action.type](state) :
    state;
}
