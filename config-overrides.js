/* config-overrides.js */
const rewireStyledComponents = require('react-app-rewire-styled-components')
module.exports = function override (config, env) {
  // add a plugin
  config = rewireStyledComponents(config, env, {
    displayName: true,
    preprocess: true,
    minify: false,
  })
  return config
}
