![Trowel](media/dist/banners/trowel-black-on-transparent.png)

# Trowel
[![CircleCI](https://circleci.com/gh/Trowel/Trowel.svg?style=svg)](https://circleci.com/gh/Trowel/Trowel)
[![Bower](https://img.shields.io/bower/v/trowel-core.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/v/trowel-core.svg?maxAge=2592000)]()

The most evolving way to write scss code

## Download
```sh
# with bower
bower install trowel-core --save

# with npm
npm install trowel-core --save

# with yarn
yarn add trowel-core
```

## What is *Trowel* ?
Trowel is made for helping you to create and customize visual components.

### The frameworks state of play
CSS frameworks like Bootstrap or Foundation are great to start projets because they provide solid bases to your front-end design. Sass and less versions of thoses librairies are even better because they allow you to customize the UI through variables like below :
```scss
// typical way to customize a framework with scss variables.
$button-primary-bg: rgb(31, 13, 51) !default;
$button-success-bg: rgb(55, 211, 189) !default;
$button-warning-bg: rgb(255, 176, 0) !default;
$button-danger-bg: rgb(253, 65, 100) !default;
```
But maybe you just need two themes for you button component or maybe you need to create a fith theme. Today you cannot do this easily and quickly with variables and it makes framework painful to use when you need deep changes from your design.

### The *Trowel* way
Trowel is a Sass extension designed to create framework easier and quicker to customize. The key feature provided by *Trowel* is a new way to write scss variables : we will defined into a single variable all the variants for a property.

If we translate in *Trowel variable* the previous example we will need a single variable :
```scss
// the trowel variable for button backgrounds
$button-bg: (
  '-primary': rgb(31, 13, 51),
  '-success': rgb(55, 211, 189),
  '-warning': rgb(255, 176, 0),
  '-danger': rgb(253, 65, 100),
) !default;
```
Then *Trowel* will loop over the map `$button-bg` and generate css declaration for each button variant.

You don't need `.btn--danger` button variant ? Just redefine the `$button-bg` variable without the `'-danger'` and you won't find it into your style.

You want to add an 'info' variant for your button component ? Rewrite the `$button-bg` map by adding a new entry with `'-info''` as entry and the color you want as value.


## Learn *Trowel*
If you want to learn how to use a *Trowel component* and create your own, check out our [getting started](./doc/1-the-concept.md) tutorial.


## Contribution
A contribution guide is coming soon
