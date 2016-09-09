var path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

module.exports = {
  entry: './src/handler.ts',
  target: 'node',
  externals: [ "aws-sdk" ], // modules to be excluded from bundled file
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],

    // Make sure root is src
    root: root('src'),

    // remove other default values
    modulesDirectories: ['node_modules']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: 'handler.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        query: {
          search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
          replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
          flags: 'g'
        },
        include: [root('src')]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'ts-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/aws-config.json',
        to: 'aws-config.json'
      }
    ]),
  ],
};
