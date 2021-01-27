const path                    = require('path');
const fs                      = require('fs');
const webpack                 = require('webpack');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const HtmlWebpackPugPlugin    = require('html-webpack-pug-plugin');
//const { stylus_plugin  } = require('stylus_plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ExtractTextPlugin       = require("extract-text-webpack-plugin");
const extractCSS              = new ExtractTextPlugin('css/style.css');



var glob                      = require('glob');

// Förslag 1
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

// Förslag 2
const woff = 
{
  test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: 'url-loader?limit=10000',
};

const eot =
{
  test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
  use: 'file-loader',
};

const jpeg = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  use: [
    'file-loader?name=images/[name].[ext]',
    'image-webpack-loader?bypassOnDebug'
  ]
};

const pug = {
    test: /\.pug$/,
    use: ['html-loader?attrs=false', 'pug-html-loader']
};



const styl = {
    test: /\.styl$/,
    use: [
      { loader: 'style-loader'},
      { loader: 'css-loader'},
      { loader: 'stylus-loader'}
    ]
};

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

    
const pages_section =
  fs
    .readdirSync(path.resolve(__dirname, 'src/portfolio/'))
    .filter(fileName => fileName.endsWith('.pug'))
    .map(filename => filename.replace('.pug',''));
  

var part = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: 'portfolio.html',
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
});


const config = {
 
  entry: {
    portfolio: './src/portfolio/portfolio.js'
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    // publicPath: '/'
  },
  module: {
    rules: [woff, eot, jpeg, pug, scss, styl]
  },
  plugins: part
};

module.exports = config;
