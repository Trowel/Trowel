![Trowel](media/dist/banners/trowel-black-on-transparent.png)

# trowel
[![CircleCI](https://circleci.com/gh/Trowel/Trowel.svg?style=svg)](https://circleci.com/gh/Trowel/Trowel)
[![Bower](https://img.shields.io/bower/v/trowel-core.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/v/trowel-core.svg?maxAge=2592000)]()


Core of trowel, framework for sass libraries

## install
```sh
# with bower
bower install trowel-core

# with npm
npm install trowel-core
```

Then include thoses lines before any trowel library in your `.scss` file
```
@import './bower_components/sassy-maps/sass/sassy-maps';
@import './bower_components/trowel-core/src/trowel';
```

## Run the demo
```sh
npm install
bower install
bower start
```

## Understand the demo
* All the code relative to the library itself is in `src/` folder
* Into the `demo/src/scss/trowel-component/` folder contains code that simulate what a trowel-component could look like.
* The files `demo/src/scss/style.scss` and `demo/src/scss/_variables.scss` simulate the code of a project that includes `trowel-component`

## Manifest of trowel
The reason of why trowel exists are available in french at `manifest-fr.md`
