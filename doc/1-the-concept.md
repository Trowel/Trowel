# Introduction
Trowel is made for helping you to create and customize visual components. Let's see and check sereral things before going through how to use Trowel.

## The concept
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

Learn more about how to use frameworks based on Trowel in the next section : How to use a Trowel component


## Prerequisites
Trowel is based on some key features of sass like `variables`, `mixins`, `functions`, `map`. Make sure to be confortable with sass before reading further.

Trowel is designed for a specific kind of methodology. It is a "component focus" framework which means it is made to design visual component independently that you will then assemble into a web page. This methodology is well known as **atomic design**. We strongly recommand you to read [this article](http://bradfrost.com/blog/post/atomic-web-design/) written by *Brad Frost* the creator of the Atomic Design.

Trowel is also deeply based on [BEM](https://en.bem.info/methodology/quick-start/) which is a methodology for naming css classes. Even if we can change the synthax the classes generated with Trowel, the BEM philosophy will remain, which make it the last prerequisite required before playing with Trowel.

---
**next section : [How to use a Trowel component](2-use-a-Trowel-component.md)**
