import angular from 'angular'

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

    payload.service (payload).then (
      payload => dispatch (newAction (false, payload)),
      error => dispatch (newAction(true, { error })))
  }
}
