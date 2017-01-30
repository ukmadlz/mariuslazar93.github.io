var ScrollComponent = function() {
    var $triggerElements,
        options;

    var defaultOptions = {
        sourceElement: '.js-scroll',
        duration: 400
    }

    function handleOnClick(e) {
        e.preventDefault();
        var $this = $(this),
            $container,
            targetElement,
            containerSelector = $this.attr('data-scroll-container'),
            targetElemSelector = $this.attr('data-scroll-target');

        if (!containerSelector) {
            containerSelector = 'window';
            $container = $('html, body');
        } else {
            $container = $(containerSelector);
        }

        if (containerSelector === targetElemSelector) {
            $container.animate({
                scrollTop: 0
            }, options.duration);
        } else {
            targetElement = document.querySelector(targetElemSelector);
            $container.animate({
                scrollTop: Math.abs(targetElement.offsetTop - $container[0].offsetTop)
            }, options.duration);
        }
    }

    function bindEvents() {
        $triggerElements.on('click', handleOnClick);
    }

    function init(userOptions) {

        options = $.extend({}, defaultOptions, userOptions);

        $triggerElements = $(options.sourceElement);

        if ($triggerElements.length) {
            bindEvents();
        }
    }

    return {
        init: init
    }
}();
