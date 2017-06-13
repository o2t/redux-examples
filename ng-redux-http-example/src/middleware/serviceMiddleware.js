
export default function serviceMiddleware () {
  return ({ dispatch, getState }) => next => action => {
    const { payload } = action
    if (! payload.service || ! typeof payload.service === 'function')
      return next (action)

    next ({
      ...action,
      type: action.type + "_PENDING"
    })

    const newAction = (rejected, result) => {
      const a = {
        ...action,
        type: `${action.type}_${rejected ? "REJECTED" : "FULFILLED"}`,
        payload: {
          ...action.payload,
          ...result
        }
      }

      delete a.payload.service
      return a
    }

    const { instance, config } = payload.service
    instance (config).then (
      ({data}) => dispatch (newAction (false, { data })),
      (error) => dispatch (newAction(true, { error })))
  }
}
