# starwars - public

## Requirements
- Node.js (5.0 or newer)

## Stack
- [Babel](http://babeljs.io/) `^6.0.0` ES6+ support
- [Sass](http://sass-lang.com/) CSS with superpowers
- [Imagemin](https://github.com/imagemin/imagemin) minify images seamlessly
- [Browsersync](http://www.browsersync.io/) time-saving synchronised browser testing
- [Gulp](http://gulpjs.com/) streaming build system
- [Webpack](https://webpack.github.io/) module loader and bundler


## Getting started

### Install

Just [clone](github-windows://openRepo/https://github.com/LeoLeBras/starwars.git) the repo
and start :

```shell
$ git clone https://github.com/LeoLeBras/starwarst.git
$ cd starwars
$ npm i                         # Install Node.js components listed in ./package.json
$ cd public
```
Think to install gulp in global on your desktop : `npm i gulp -g`, if this has not been done before.

#### How to start the dev mode ?

```shell
$ npm start                     # or: gulp dev
```

This will start a lightweight development server (browsersync dev server) with live reloading (default: localhost:8000).

#### How to build for production ?

```shell
$ npm run build                # or: gulp production
```
