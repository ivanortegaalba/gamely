import PropTypes from 'prop-types';

PropTypes.game = PropTypes.shape({
  name: PropTypes.string.isRequired,
  short: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string,
  hasBoosters: PropTypes.bool,
  isFavourite: PropTypes.bool,
});

export default PropTypes;
