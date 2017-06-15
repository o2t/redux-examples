import PropTypes from "prop-types"

const fail = (props, propName, componentName) => {
  return new Error(`Action ${componentName}: no such contract '${propName}'`)
}

export default function (contracts) {
  return () => next => action => {
    const { payload, type } = action
    if (!payload || !type)
      return next(action)

    if (typeof payload !== 'object') {
      console.error(`actiondbc: action ${type} has a non object payload (${payload})`)
      return next(action)
    }

    const proptypes = Object.keys(payload).reduce((proptypes, contract) => {
      proptypes[contract] = contracts[contract] || fail
      return proptypes
    }, {})

    PropTypes.checkPropTypes (proptypes, payload, 'property', type)
    return next(action)
  }
}