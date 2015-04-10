# Page slide demo
A small application that uses [weblinc/jquery.smoothState.js](https://github.com/weblinc/jquery.smoothState.js) 
to load page contents and add a smooth transition between pages. In this case, the pages are placed in a matrix 
that has three levels (see [## notes]). Although, in this demo, you can navigate from any page to any other page, 
not all page navigations have a transition. Only the options listed in the table in the notes have a page
transition according to the following logic:

- Navigating from level 1:
    - To level 1:
        If the target page is to the left of the current page, slide right.
        Otherwise, slide right
    - To level 2:
        Slide up
    - To level 3:
        No transition
- Navigating from level 2:
    - To level 1:
        If the target page is the parent of the current page, slide down.
        Otherwise, logic 'from level 1 to level 1' applies
    - To level 2:
        No transition
    - To level 3;
        Slide up
- Navigating from level 3:
    - To level 1:
        Logic 'from level 1 to level 1' applies
    - To level 2:
        Logic 'from level 2 to level 1' applies
    - To level 3:
        No transition

## Dependencies
* Modernizr
* Normalize.css
* Animate.css
* jQuery
* HeadJs
* history.js
* smoothState.js (customized to suit the requirements of this project)

## Installation
Run `bower install` as well as `npm install` to get all packages and dependencies and then run `grunt setup` to 
generate all necessary files. All assets are copied from the `bower_components` and `src` folders to the `web/` folder.

## Notes
### SmoothState
The smoothState.js is an adapted version from the original. I based my changes on how it's done in 
[www.howarkitekter.se](http://www.howarkitekter.se/c/themes/how/assets/javascripts/plugins.js). In that project, an 'onClick'
callback handler is defined to be able to access the click event.

### Page matrix
The arrows indicate the possible transition that can occur at a particular level. If there is no transition possible/defined, 
this is indicated with an 'X'.

| from\to |      level#1       | level#2 | level#3 |
|---------|:------------------:|:-------:|:-------:|
| level#1 |←&nbsp;&nbsp;&nbsp;→|    ↑    |    X    |
| level#2 |←&nbsp;↓&nbsp;→     |    X    |    ↑    |
| level#3 |←&nbsp;↓&nbsp;→     |    ↓    |    X    |
