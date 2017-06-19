export default function serviceMiddleware () {
  return ({ dispatch }) => next => action => {
    if (! action.service)
      return next (action)

    if (typeof action.service !== 'function') {
      console.error("service prop must be a function")
      return next (action)
    }

    // clone the action and delete the service prop to avoid reentrance
    action = { ...action }
    const { service } = action
    delete action.service

    const { payload, type } = action
    const optimisticAction = `${type}_PENDING`
    const successAction = `${type}_SUCCESS`
    const errorAction = `${type}_ERROR`

    next ({
      ...action,
      type: optimisticAction
    })

    const thenSuccess = resultPayload => dispatch ({
      ...action,
      type: successAction,
      payload: {
        ...action.payload,
        ...resultPayload
      }
    })

    const thenError = error => dispatch ({
      ...action,
      type: errorAction,
      error,
    })

    service (payload).then (thenSuccess, thenError)
  }
}
