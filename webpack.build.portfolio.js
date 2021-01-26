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

/*
const pages =
  fs
    .readdirSync(path.resolve(__dirname, 'src/venue/'))
    .filter(fileName => fileName.endsWith('.pug'))
    .map(filename => filename.replace('.pug',''));
*/

// OBS! Ej nödvändigt för venue
const pages_section =
  fs
    .readdirSync(path.resolve(__dirname, 'src/portfolio/'))
    .filter(fileName => fileName.endsWith('.pug'))
    .map(filename => filename.replace('.pug',''));


var part = [
  new CleanWebpackPlugin(),
  /*
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.pug',
    inject: true,
    chunks: ['index']
  }),

  // Ej nödvändigt för venue
  new HtmlWebpackPlugin({
    filename: 'quiz.html',
    template: 'src/components/quiz/quiz.pug',
    inject: true,
    chunks: ['quiz'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),
  new HtmlWebpackPlugin({
    filename: 'exercise.html',
    template: 'src/components/quiz/exercise.pug',
    inject: true,
    chunks: ['exercise'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),
  new HtmlWebpackPlugin({
    filename: 'examination.html',
    template: 'src/components/quiz/examination.pug',
    inject: true,
    chunks: ['examination'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),    
  new HtmlWebpackPlugin({
    filename: 'editor.html',
    template: 'src/components/editor/editor.pug',
    inject: true,
    chunks: ['editor'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),  
  new HtmlWebpackPlugin({
    filename: 'topnav.html',
    template: 'src/components/topnav/topnav.pug',
    inject: true,
    chunks: ['topnav'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),
  new HtmlWebpackPlugin({
    filename: 'typography.html',
    template: 'src/components/typography/typography.pug',
    inject: true,
    chunks: ['typography'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),
  new HtmlWebpackPlugin({
    filename: 'footer.html',
    template: 'src/components/footer/footer.pug',
    inject: true,
    chunks: ['footer'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),
  */
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/portfolio/portfolio.pug',
    inject: true,
    chunks: ['portfolio'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),
];


// section alla komponenter
// ej nödvändigt för venue
pages_section.forEach(page => {
  console.log(page);
  part.push(
    new HtmlWebpackPlugin({
      filename: page + '.html',
      template: 'src/portfolio/' + page + '.pug',
      inject: true,
      chunks: ['portfolio'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
    })
  );
  part.push(new ExtractTextPlugin('[name].[hash].css'));
});

/*
// venue alla komponenter
pages.forEach(page => {
  console.log(page);
  part.push(
    new HtmlWebpackPlugin({
      filename: page + '.html',
      template: 'src/venue/' + page + '.pug',
      inject: true, 
      chunks: ['index']
    })
  );
  // part.push(new ExtractTextPlugin('style.[hash].css'));
});
*/

part.push(new ExtractTextPlugin('style.[hash].css'));

const config = {
  mode: 'production',
  entry: {
    /*
    index: './src/index.js',
    // ej nödvändigt för venue
    quiz: "./src/components/quiz/quiz.js", // <---- viktigt att skapa multipla entrys om vi har fler än en
    exercise: "./src/components/quiz/exercise.js",
    examination: "./src/components/quiz/examination.js",
    editor: "./src/components/editor/editor.js",
    topnav: './src/components/topnav/topnav.js',
    typography: './src/components/typography/typography.js',
    section: './src/components/section/section.js',
    footer: './src/components/footer/footer.js'
    */
    portfolio: './src/portfolio/portfolio.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    // publicPath: '/'
  },
  module: {
    rules: [woff, eot, jpeg, pug, styl]
  },
  plugins: part
};

module.exports = config;
