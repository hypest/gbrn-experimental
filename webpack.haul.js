const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = ({ platform, root }, defaults) => ({
  entry: `./index.js`,
  resolve: {
    ...defaults.resolve,
    alias: {
      ...defaults.resolve.alias,
      '@wordpress/element': path.join(root, 'gutenberg', 'element'),
      '@wordpress/utils': path.join(root, 'gutenberg', 'utils'),
      '@wordpress/hooks': path.join(root, 'gutenberg', 'blocks', 'api', 'rn', 'hooks'),
    }
  },
  module: {
    ...defaults.module,
    rules: [
      ...defaults.module.rules,
      {
        test: /\.pegjs/,
        use: 'pegjs-loader',
      },
    ]
  },
  plugins: [
    ...defaults.plugins,
    new webpack.ProvidePlugin({
      "React": "react",
    }),
  ],
});
