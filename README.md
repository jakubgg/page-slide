# Page slide demo
A small application that uses [weblinc/jquery.smoothState.js](https://github.com/weblinc/jquery.smoothState.js) 
to load page contents and add a smooth transition between pages. In this case, the pages are placed in a matrix 
that has three levels (see [Matrix](#page-matrix)). Although, in this demo, you can navigate from any page to any other page, 
not all page navigation possibilities have a transition. Only the options listed in the table (see [Matrix](#page-matrix)) have a page
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

## Setup
Run `bower install` as well as `npm install` to get all packages and dependencies and then run `grunt setup` to 
generate all necessary files. All assets are copied from the `bower_components` and `src` folders to the `web/` folder.

### Data attributes
The PageSlide.js logic depends on certain data-attributes being present.
  
* __data-page-number__

  Parameter that is assigned to each anchor in the navigation. Can be one of:
  - n (top level pages, e.g. `data-page="1"`)
  - n-m (second level pages, e.g. `data-page="1-2"` (second page of first tier))
  - n-m-o (third level pages, e.g. `data-page="1-2-1"` (first page of second tier of first tier)
    
  If you only want your pages to slide from left to right, use the first syntax (e.g. `data-page="1"`, `data-page="2"`, ...)
  If you want your pages to slide up and down, use the second syntax and set 'n' to be the same across all pages, for example:
  `data-page="1-1"`, `data-page="1-2"`, `data-page="1-3"` and so on.
  
* __data-page-status__

  Assigned to the current anchor element in the navigation. Doesn't necessarily have to be an anchor, as long as it is an 
  element with this attribute. The value of this attribute is always 'current'.
  
### Page structure
By default, the demo uses the following HTML structure:
```html
<div class="navigation">
    <ul>
        <il><a href="/" data-page-number="1">1</a>
        <il><a href="/page-2" data-page-number="2">2</a>
        <li><span data-page-number="3" data-page-status="current">Current</span>
        ...
    </ul>
</div>

<div class="page-element">
    here be content
</div>
```

The class names that are used for the navigation part as well as the content part, can be configured in `src/PageSlide.js`.

## Notes
### SmoothState
The smoothState.js is an adapted version from the original. I based my changes on how it's done in 
[www.howarkitekter.se](http://www.howarkitekter.se/c/themes/how/assets/javascripts/plugins.js). In that project, an 'onClick'
callback handler is defined to be able to access the click event.

### Bower
Animate.css is used for page transition animations. The file `cfg/bower/animate-config.json` holds the animations that will be 
available. Adapt this file according to whatever animations are needed. After `bower install`, 
`bower_components/animate.css/animate-config.json` holds the full list of animations available.

### Page matrix
The arrows indicate the possible transition that can occur at a particular level. If there is no transition possible/defined, 
this is indicated with an 'X'.

| from\to |      level#1       | level#2 | level#3 |
|---------|:------------------:|:-------:|:-------:|
| level#1 |←&nbsp;&nbsp;&nbsp;→|    ↑    |    X    |
| level#2 |←&nbsp;↓&nbsp;→     |    X    |    ↑    |
| level#3 |←&nbsp;↓&nbsp;→     |    ↓    |    X    |
