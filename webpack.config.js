const path = require('path');

module.exports = {
  entry: {
    background: './src/backgrounds/mainBackground.ts',
    content: './src/contents/displayAgeContent.ts',
    remove_error_content: './src/contents/removeErrorContent.ts',
    donateContent: './src/contents/donateContent.ts',
    types: './src/types/types.ts',
    constant: './src/constant/constant.ts',
    typeguard: './src/utilities/TypeGuard.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist/src'),
    filename: (pathData) => {
      const relativePath = path.relative(path.resolve(__dirname, 'src'), pathData.chunk.entryModule.rawRequest);
      return relativePath.replace(/\.ts$/, '.js');
    }
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false
  }
};
