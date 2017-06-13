
export default function serviceMiddleware () {
  return ({ dispatch, getState }) => next => action => {
    const { payload } = action
    if (! payload.service)
      return next (action)

    next ({
      ...action,
      type: action.type + "_PENDING"
    })

    const { instance, config } = payload.service
    instance (config)
      .then (({data}) => {
        let a = {
          ...action,
          type: action.type + "_FULFILLED"
        };

        a.payload.data = data;
        delete a.payload.service
        return dispatch(a);
      }, (error) => {
        let a = {
          ...action,
          type: action.type + "_REJECTED"
        };

        a.payload.error = error;
        delete a.payload.service
        dispatch (a)
      })
  }
}
