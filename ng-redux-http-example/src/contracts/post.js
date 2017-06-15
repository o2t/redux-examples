import PropTypes from 'prop-types'
export default PropTypes.shape({
  data: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
})