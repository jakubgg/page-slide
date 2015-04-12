# Page slide demo
A small application that uses [weblinc/jquery.smoothState.js](https://github.com/weblinc/jquery.smoothState.js) 
to load page contents and add a smooth transition between pages. In this case, the pages are placed in a matrix 
that has three levels (see [Notes](#notes)). Although, in this demo, you can navigate from any page to any other page, 
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

## Running
The PageSlide.js logic depends on certain data-attributes being present.
* __data-page__
  
  Assigned to one of the containing elements of the page contents. Can be one of:
  - n (top level pages, e.g. data-page="1")
  - n-m (second level pages, e.g. data-page="1-2" (second page of first tier))
  - n-m-o (third level pages, e.g. data-page="1-2-1" (first page of second tier of first tier)
  
* __data-page-number__

  Parameter that is assigned to each anchor in the navigation. The values of this parameter follow the same construct as the __data-page__ parameter.
  
* __data-page-status__

  Assigned to the current anchor element in the navigation. Doesn't necessarily have to be an anchor, as long as it is an element with this attribute.
  
## Notes
### SmoothState
The smoothState.js is an adapted version from the original. I based my changes on how it's done in 
[www.howarkitekter.se](http://www.howarkitekter.se/c/themes/how/assets/javascripts/plugins.js). In that project, an 'onClick'
callback handler is defined to be able to access the click event.

### Bower
Animate.css is used for page transition animations. The file `cfg/bower/animate-config.json` holds the animations that will be available. Adapt this file according to whatever animations are needed. After `bower install`, `bower_components/animate.css/animate-config.json` holds the full list of animations available.

### Page matrix
The arrows indicate the possible transition that can occur at a particular level. If there is no transition possible/defined, 
this is indicated with an 'X'.

| from\to |      level#1       | level#2 | level#3 |
|---------|:------------------:|:-------:|:-------:|
| level#1 |←&nbsp;&nbsp;&nbsp;→|    ↑    |    X    |
| level#2 |←&nbsp;↓&nbsp;→     |    X    |    ↑    |
| level#3 |←&nbsp;↓&nbsp;→     |    ↓    |    X    |
