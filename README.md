# Page slide demo
A small application that uses [weblinc/jquery.smoothState.js](https://github.com/weblinc/jquery.smoothState.js) to load page contents and add a smooth transition between pages.

## Dependencies
* Modernizr
* Normalize.css
* Animate.css
* jQuery
* HeadJs
* history.js
* smoothState.js

## Installation
Run `bower install` as well as `npm install` to get all packages and dependencies and then run `grunt setup` to generate all necessary files.

## Notes
The smoothState.js is an adapted version from the original. I based my changes on how it's done in [www.howarkitekter.se](http://www.howarkitekter.se/c/themes/how/assets/javascripts/plugins.js).

This demo has pages that go three levels deep. You cannot go every page from any particular page. See the table below to see what the possible directions are. An arrow indicates the sliding direction and an 'X' indicates that there is no direction defined for that combination.

| from\to |      level#1       | level#2 | level#3 |
|---------|:------------------:|:-------:|:-------:|
| level#1 |←&nbsp;&nbsp;&nbsp;→|    ↑    |    X    |
| level#2 |←&nbsp;↓&nbsp;→     |    X    |    ↑    |
| level#3 |←&nbsp;↓&nbsp;→     |    ↓    |    X    |
