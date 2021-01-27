const path                    = require('path');
const fs                      = require('fs');
const webpack                 = require('webpack');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const HtmlWebpackPugPlugin    = require('html-webpack-pug-plugin');
//const { stylus_plugin  } = require('stylus_plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
var glob                      = require('glob');

const ExtractTextPlugin       = require("extract-text-webpack-plugin");
const extractCSS              = new ExtractTextPlugin('css/style.css');

const pug = {
    test: /\.pug$/,
    use: ['html-loader?attrs=false', 'pug-html-loader']
};

const styl = {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'stylus-loader'
        ]
    })
};

const scss = {
  test: /\.s[ac]ss$/,
  use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'sass-loader'
      ]
  })
};

/*
const scss = {
  test: /\.s[ac]ss$/,
  use: extractCSS.extract({use: ["css-loader", "sass-loader"]})
};
*/
/*
const scss = {
  test: /\.s[ac]ss$/,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
};
*/

/*
const resources = {
  test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/'
      }      
    }    
  ]
};
*/


const woff = 
{
  test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: {
    loader: 'url-loader?limit=10000',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/'
    }
  }    
};

const eot =
{
  test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/'
    }
  }    
};

const jpeg = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  use: [
    'file-loader?name=images/[name].[ext]',
    'image-webpack-loader?bypassOnDebug'
  ]
};

const pages_section =
  fs
    .readdirSync(path.resolve(__dirname, 'src/portfolio/'))
    .filter(fileName => fileName.endsWith('.pug'))
    .map(filename => filename.replace('.pug',''));


var part = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/portfolio/portfolio.pug',
    inject: true,
    chunks: ['portfolio'] 
  }),
];


pages_section.forEach(page => {
  console.log(page);
  part.push(
    new HtmlWebpackPlugin({
      filename: page + '.html',
      template: 'src/portfolio/' + page + '.pug',
      inject: true,
      chunks: ['portfolio'] 
    })
  );
  part.push(new ExtractTextPlugin('[name].[hash].css'));
});


part.push(new ExtractTextPlugin('style.[hash].css'));

const config = {
  mode: 'production',
  entry: {
    portfolio: './src/portfolio/portfolio.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    // publicPath: '/'
  },
  module: {
    rules: [woff, eot, jpeg, pug, scss, styl ]
  },
  plugins: part
};

module.exports = config;
