const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = ({ platform, root }, defaults) => ({
  entry: `./index.js`,
  resolve: {
    ...defaults.resolve,
    alias: {
      ...defaults.resolve.alias,
      '@wordpress/i18n': path.join(root, 'gutenberg', 'i18n'),
      '@wordpress/element': path.join(root, 'gutenberg', 'element'),
      '@wordpress/utils': path.join(root, 'gutenberg', 'utils'),
      '@wordpress/components': path.join(root, 'gutenberg', 'components'),

      // overrides
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
    new webpack.DefinePlugin({
      'window.Node': {
        ELEMENT_NODE                :  1,
        ATTRIBUTE_NODE              :  2,
        TEXT_NODE                   :  3,
        CDATA_SECTION_NODE          :  4,
        ENTITY_REFERENCE_NODE       :  5,
        ENTITY_NODE                 :  6,
        PROCESSING_INSTRUCTION_NODE :  7,
        COMMENT_NODE                :  8,
        DOCUMENT_NODE               :  9,
        DOCUMENT_TYPE_NODE          : 10,
        DOCUMENT_FRAGMENT_NODE      : 11,
        NOTATION_NODE               : 12
      }
    })
  ],
});
