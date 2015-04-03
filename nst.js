;(function (window, undefined) {
    head.load({build: '/build.js'});

    head.ready('build', function () {
        var $body = $('body');

        /**
         * Originating slide level
         */
        var fromLevel;

        /**
         * Target slide level
         */
        var toLevel;

        /**
         * Parses a string and returns an array
         *
         * @param levels
         * @returns Array
         */
        var getLevelArray = function (levels) {
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
         * @returns String
         */
        var getSlideDirection = function () {
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
             * Three way comparison for the page levels
             * @var Array
             */
            var levelCompare = (function (a, b) {
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
             * Detect the slide direction
             */
            if (toFirst) {
                if (levelCompare[0] === 0) { //same branch
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
         * @var string
         */
        var whichAnimationEvent = function () {
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

            return null;
        };

        /**
         * SmoothState instance
         */
        var content = $('#main').smoothState({
            anchors      : '.navigation a',
            development  : false,
            prefetch     : true,
            pageCacheSize: 0,
            onClick      : function (event) {
                toLevel = getLevelArray($(event.currentTarget).attr('data-slider-number'));
                fromLevel = getLevelArray($(event.currentTarget).parents('.navigation').find('[data-slider-status=current]').attr('data-slider-number'));
            },
            onEnd        : {
                /**
                 * Executes when content is ready to be injected
                 * @param string url
                 * @param jQuery $container
                 * @param jQuery $content
                 */
                render: function (url, $container, $content) {
                    var slideDirection = getSlideDirection();

                    var oldPageElement = $container.find('.page-element');
                    var newPageElement = $content.find('.page-element');

                    var oldPageNavigation = $container.find('.navigation');
                    var newPageNavigation = $content.find('.navigation');

                    oldPageNavigation.replaceWith(newPageNavigation);

                    //define the position of the new page element
                    switch (slideDirection) {
                        case 'up':
                            newPageElement.css('bottom', '-100%');
                            break;
                        case 'right':
                            newPageElement.css('left', '-100%');
                            break;
                        case 'down':
                            newPageElement.css('top', '-100%');
                            break;
                        case 'left':
                            newPageElement.css('right', '-100%');
                            break;
                    }

                    //place the new page element before or after the current one
                    if (slideDirection === 'down' || slideDirection === 'left') {
                        oldPageElement.after(newPageElement);
                    } else {
                        oldPageElement.before(newPageElement);
                    }

                    //set the animation
                    $body.addClass('slide-' + slideDirection);
                    console.log(whichAnimationEvent());
                    //clean up after animation has ended
                    $body.find('.page-element').one(whichAnimationEvent(), function (event) {
                        oldPageElement.remove();
                        newPageElement.attr('style', '');
                        $body.removeClass('slide-' + slideDirection);
                    });
                }
            }
        }).data('smoothState');
    });
})(window);
