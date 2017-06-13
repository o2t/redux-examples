import {
  REQUEST_POSTS, REQUEST_POSTS_SUCCESS, REQUEST_POSTS_ERROR,
  REQUEST_CHANGE_FEED, REQUEST_NOOP,
  REQUEST2_POSTS, REQUEST2_POSTS_PENDING, REQUEST2_POSTS_FULFILLED, REQUEST2_POSTS_REJECTED,
  REQUEST3_POSTS, REQUEST3_POSTS_PENDING, REQUEST3_POSTS_FULFILLED, REQUEST3_POSTS_REJECTED,
} from '../actions/request';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null,
  feed: "all"
};

export default function posts(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [REQUEST_POSTS]: (state) => ({
      ...state,
      isFetching: true,
      error: false
    }),
    [REQUEST_POSTS_SUCCESS]: (state) => ({
      ...state,
      isFetching: false,
      data: payload.response.data.children
    }),
    [REQUEST_POSTS_ERROR]: (state) => ({
      ...state,
      isFetching: false,
      error: payload.error
    }),
    [REQUEST_CHANGE_FEED]: (state) => ({
      ...state,
      feed: payload.feed
    }),
    [REQUEST_NOOP]: (state) => {
      console.log (`noop ${payload}`)
      return state
    },

    [REQUEST2_POSTS_PENDING]: (state) => ({
      ...state,
      isFetching: true,
      error: false
    }),
    [REQUEST2_POSTS_FULFILLED]: (state) => ({
      ...state,
      isFetching: false,
      data: payload.data.children
    }),
    [REQUEST2_POSTS_REJECTED]: (state) => ({
      ...state,
      isFetching: false,
      error: `error ${payload.data.error}: ${payload.data.message}`
    }),

    [REQUEST3_POSTS_PENDING]: (state) => ({
      ...state,
      isFetching: true,
      error: false
    }),
    [REQUEST3_POSTS_FULFILLED]: (state) => ({
      ...state,
      isFetching: false,
      data: payload.data.children
    }),
    [REQUEST3_POSTS_REJECTED]: (state) => ({
      ...state,
      isFetching: false,
      error: `error ${payload.data.error}: ${payload.data.message}`
    }),
  };

  return actions[action.type] ?
    actions[action.type](state) :
    state;
}
