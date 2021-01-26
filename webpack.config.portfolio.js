const path                    = require('path');
const fs                      = require('fs');
const webpack                 = require('webpack');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const HtmlWebpackPugPlugin    = require('html-webpack-pug-plugin');
//const { stylus_plugin  } = require('stylus_plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
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

/*
const pages =
  fs
    .readdirSync(path.resolve(__dirname, 'src/venue/'))
    .filter(fileName => fileName.endsWith('.pug'))
    .map(filename => filename.replace('.pug',''));
*/
    
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
  /*
  new HtmlWebpackPlugin({
    filename: 'section.html',
    template: 'src/components/section/section.pug',
    inject: true,
    chunks: ['section'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),
  */
  new HtmlWebpackPlugin({
    filename: 'portfolio.html',
    template: 'src/portfolio/portfolio.pug',
    inject: true,
    chunks: ['portfolio'] // <--- denna del gör att vi kan hålla javascript filerna separerade för respektive .html fil vi ska skapa
  }),
];

// section alla komponenter
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
});
*/

const config = {
  // entry: './src/index.js', // <-- används om vi har en för alla
  /*
  entry : {
    index: './src/index.js',
    quiz: './src/components/quiz/quiz.js'
  },
  */
  entry: {
    /*
    index: './src/index.js',
    quiz: "./src/components/quiz/quiz.js", // <---- viktigt att skapa multipla entrys om vi har fler än en
    exercise: "./src/components/quiz/exercise.js",
    examination: "./src/components/quiz/examination.js",
    editor: "./src/components/editor/editor.js", // <---- Skapar en editor med handlebars.js och genererar bland annat HTML kod
    topnav: './src/components/topnav/topnav.js',
    typography: './src/components/typography/typography.js',
    section: './src/components/section/section.js',
    footer: './src/components/footer/footer.js'
    */
    portfolio: './src/portfolio/portfolio.js'
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
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

/*
// OLD default sources

// Store .html file names in src/ in an array
const pages =
  fs
    .readdirSync(path.resolve(__dirname, 'src/pug/venue/pages/'))
    .filter(fileName => fileName.endsWith('.pug'))
    .map(filename => filename.replace('.pug',''));


var part = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/pug/index.pug',
    inject: true,
  }),
  new HtmlWebpackPlugin({
    filename: 'test.html',
    template: 'src/pug/pages/test.pug',
    inject: true,
  }),  
  new HtmlWebpackPlugin({
    filename: 'quiz.html',
    template: 'src/pug/pages/quiz.pug',
    inject: true,
  }),  

];

pages.forEach(page => {
  console.log(page);
  part.push(
    new HtmlWebpackPlugin({
      filename: page + '.html',
      template: 'src/pug/venue/pages/' + page + '.pug',
      //inject: true, 
      //chunks: [page]
    }) 
  );
});

const config = {
  // entry: './src/index.js', // <-- används om vi har en för alla
  entry : {
    index: './src/index.js',
    quiz: './src/pug/entrys/quiz.js'
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: '[name].[contenthash].bundle.js',
    // publicPath: '/'
  },
  module: {
    rules: [pug, styl]
  },
  plugins: part
};
module.exports = config;
*/