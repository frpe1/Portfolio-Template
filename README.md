# Portfolio Template

## Description

Portfolio template

## Preview

![Image of Portfolio Template](http://utopiafx.se/uA84oq09463812742cru73/b1.png)

## Requirements

This template is using PUG and STYLUS. 
You'll need to install npm, node, pug, stylus, and webpack in order to make it work.

## How to use

First you download the project into a folder with git.
Then go to the folder and type

```
npm install
```

Start development server environment

```
npm run dev:portfolio
```

Open the browser (if its not open automatically yet)
type localhost:8080/portfolio.html

Start make some changes in the code.

When done:

Compile to an end-product version

```
npm run build:portfolio
```

Then copy everything in the map dist/ and place it to your live server

The workflow is that you doing the changes localy on your computer 
and then compile it to an end-production version and uploading it to your live-server.


## Project structure

assets/

Here you'll found all the external assets you downloaded or will use for your project.


img/

Put the image you will need for the project here

layouts/

Here you found the base-layout file. Change it if you wanna change
the meta information on the page, or if you need to include some external script and stylesheetslink
etc

mixins/

Here you could found helpfiles for your project, if you not wanna include it directly
in your main page, so put it here!

In this folder you also find the data.pug file. The data.pug contain all the contents-data you wanna
change for your project. This makes it more easier maintainable site

portfolio/

Here is the main folder for your project, where you will spend mostly of the time in your project.
There is a javascriptfile here for where you put all your javascript code, 
portfolio.pug for creating the design of the page and stylus file .styl where you 
code all your stylesheet, but doing that with help of coding stylus and not css directly.

## License

Attribution CC BY

https://creativecommons.org/licenses/by/4.0/