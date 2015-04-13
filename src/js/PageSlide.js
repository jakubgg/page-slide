/**
 *
 */
var PageSlide = (function pageSlide(window, undefined) {
    head.load('/js/build.js', function () {
        var $body = $('body');

        /**
         * Source level
         * @type {Array}
         */
        var fromLevel;

        /**
         * Target level
         * @type {Array}
         */
        var toLevel;

        /**
         * Query selector
         * @type {string}
         */
        var navigationSelector = '.navigation';

        /**
         * Query selector for the element that holds the page content that has to be animated
         * @type {String}
         */
        var contentSelector = '.page-element';

        /**
         * The element that contains the content of the page we're currently looking at
         * @type {Object}
         */
        var $oldPageContent;

        /**
         * The element that contains the content of the page we're navigating to
         * @type {Object}
         */
        var $newPageContent;

        /**
         * @type {Object}
         */
        var $oldPageNavigation;

        /**
         * @type {Object}
         */
        var $newPageNavigation;

        /**
         * Parses a string and returns an array
         *
         * @type {Function}
         * @param {String} levels Formatted as x-y-z
         * @return {Array}
         */
        var getLevelArray = function getLevelArray(levels) {
            var pageNrTemplate = [0, 0, 0];
            var pageNumbers = levels.split('-');

            $.each(pageNumbers, function (index, item) {
                pageNrTemplate[index] = parseInt(item);
            });

            return pageNrTemplate;
        };

        /**
         * Get the direction the contents of the page should move to based on current and target
         * slide position. Below combinations are possible. The arrows indicate the direction the
         * content scrolls to on page transition.
         *
         * +---------+---------+---------+---------+
         * | from\to | level#1 | level#2 | level#3 |
         * +---------+---------+---------+---------+
         * | level#1 |  ←   →  |    ↑    |         |
         * +---------+---------+---------+---------+
         * | level#2 |  ← ↓ →  |         |    ↑    |
         * +---------+---------+---------+---------+
         * | level#3 |  ← ↓ →  |    ↓    |         |
         * +---------+---------+---------+---------+
         *
         * @type {Function}
         * @return {String}
         */
        var getSlideDirection = function getSlideDirection() {
            /**
             * Page we're coming from
             * @type boolean
             */
            var fromFirst = fromLevel[1] === 0;
            var fromSecond = fromLevel[2] === 0 && fromLevel[1] > 0;
            var fromThird = fromLevel[2] > 0;

            /**
             * Page we going to
             * @type boolean
             */
            var toFirst = toLevel[1] === 0;
            var toSecond = toLevel[2] === 0 && toLevel[1] > 0;
            var toThird = toLevel[2] > 0;

            /**
             * Direction the page is sliding. Is opposite from the relation two pages have;
             * moving one page to the left, slides the page to the right.
             * @type String
             */
            var slideDirection = '';

            /**
             * Three way comparison for the page levels. Holds comparisons for all levels in
             * the current and target page. Possible comparison values are:
             *  -1: Target page is to the LEFT of current page
             *  +1: Target page is to the RIGHT of current page
             *   0: Target page is the parent of the current page
             *
             * @var Array
             */
            var levelCompare = (function levelCompare(a, b) {
                var compare = [];

                for (var i = 0, j = 3; i < j; i++) {
                    if (a[i] > b[i]) {
                        compare[i] = +1;
                    } else if (a[i] < b[i]) {
                        compare[i] = -1;
                    } else {
                        compare[i] = 0;
                    }
                }

                return compare;
            })(fromLevel, toLevel);

            /**
             * Define the slide direction
             */
            if (toFirst) {
                if (levelCompare[0] === 0) { //parent
                    slideDirection = 'down';
                } else if (levelCompare[0] < 0) {
                    slideDirection = 'left';
                } else {
                    slideDirection = 'right';
                }
            } else if (toSecond) {
                if (fromFirst) {
                    slideDirection = 'up';
                } else if (fromThird) {
                    slideDirection = 'down';
                }
            } else if (toThird) {
                if (fromSecond) {
                    slideDirection = 'up';
                }
            }

            return slideDirection;
        };

        /**
         * Contains the name of the event that is fired whenever an animation
         * ends.
         *
         * @type {Function}
         * @return {String}
         */
        var getAnimationEvent = function getAnimationEvent() {
            var a,
                el = document.createElement('fakeelement');

            var animations = {
                "animation"      : "animationend",
                "OAnimation"     : "oAnimationEnd",
                "MozAnimation"   : "animationend",
                "WebkitAnimation": "webkitAnimationEnd"
            };

            for (a in animations) {
                if (el.style[a] !== undefined) {
                    return animations[a];
                }
            }

            return '';
        };

        /**
         * SmoothState instance
         *
         * @type {Object}
         */
        var content = $('#main').smoothState({
            anchors                : navigationSelector + ' a',
            development            : false,
            prefetch               : false,
            pageCacheSize          : 20,
            pageNumberDataAttr     : 'data-page-number',
            pageNumberQuerySelector: navigationSelector + ' [data-page-status="current"]',
            onClick   : function onClick(event) {
                toLevel = getLevelArray($(event.currentTarget).attr(this.pageNumberDataAttr));
                fromLevel = getLevelArray($(event.currentTarget).parents().find(this.pageNumberQuerySelector).attr(this.pageNumberDataAttr));
            },
            onStart   : {
                render: function render() {
                    if ($oldPageContent !== undefined) {
                        $oldPageContent.remove();
                    }
                }
            },
            onProgress: {
                /**
                 * Override default onProgress function where the cursor pointer keeps
                 * showing a 'wait' cursor whenever the back-button is clicked.
                 */
                render: function render() {
                }
            },
            onEnd     : {
                /**
                 * Executes when content is ready to be injected
                 * @param {String} url
                 * @param {Object} $container
                 * @param {Object} $content
                 */
                render: function render(url, $container, $content) {
                    var slideDirection = getSlideDirection();

                    $oldPageContent = $container.find(contentSelector);
                    $newPageContent = $content.find(contentSelector);
                    $oldPageNavigation = $container.find(navigationSelector);
                    $newPageNavigation = $content.find(navigationSelector);

                    $oldPageNavigation.replaceWith($newPageNavigation);

                    /**
                     * Define the position of the new page element. The new element
                     * is to be placed behind the old element. 'behind' Is relative to the
                     * direction the page element is moving towards.
                     */
                    switch (slideDirection) {
                        case 'up':
                            $newPageContent.css('bottom', '-100%');
                            break;
                        case 'right':
                            $newPageContent.css('left', '-100%');
                            break;
                        case 'down':
                            $newPageContent.css('top', '-100%');
                            break;
                        case 'left':
                            $newPageContent.css('right', '-100%');
                            break;
                    }

                    if (slideDirection === 'down' || slideDirection === 'left') {
                        $oldPageContent.after($newPageContent);
                    } else {
                        $oldPageContent.before($newPageContent);
                    }

                    //set the animation
                    $body.addClass('slide-' + slideDirection);

                    var animationEvent = getAnimationEvent();

                    //clean up after animation has ended
                    if (animationEvent !== '') {
                        $body.find('.page-element').one(animationEvent, function (event) {
                            $oldPageContent.remove();
                            $newPageContent.attr('style', '');
                            $body.removeClass('slide-' + slideDirection);
                        });
                    }
                }
            }
        }).data('smoothState');

        /**
         * Detect whenever the back-button has been clicked.
         * Retrieve the page number that was set in the pushstate event and
         * assign its value to the 'toLevel' variable
         */
        window.addEventListener('popstate', function (event) {
            //there is no page to get back to
            if (event.state.page === undefined) {
                return;
            }

            fromLevel = toLevel;
            toLevel = getLevelArray(event.state.page);
        });
    });
})(window);
