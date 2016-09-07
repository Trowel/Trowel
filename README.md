# trowel
Core of trowel, framework for sass libraries

## install
```sh
bower install trowel-core
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
