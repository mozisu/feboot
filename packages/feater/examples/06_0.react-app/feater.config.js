const path = require('path');

module.exports = {
  css: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 3 versions',
        'iOS >= 8',
        'Android >= 4',
        'Chrome >= 40',
      ],
    },
  },
  plugins: ['../../../plugin-react/lib/index.js'],
  // plugins: [['@feater/plugin-react', {}]],
};
