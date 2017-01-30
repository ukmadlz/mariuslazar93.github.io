var FilterComponent = function() {
    var $component,
        $elementsContainer,
        $controls;

    var defaults = {
        component: '.filter-component',
        controls: '.filter-control',
        elementsContainer: '.filter-gallery'
    };

    function handleClickOnControls(e) {
        e.preventDefault();

        var $this = $(this),
            filterValue = $this.data('filter');

        $this.parent().toggleClass('highlight');

        if (filterValue.indexOf('all') >= 0) {
            var classList = $elementsContainer.attr('class');
            var indexOfAll = classList.indexOf('filter-gallery') + 'filter-gallery'.length;
            if (classList.indexOf('filter-all') > -1) {
                classList = classList.substring(0, indexOfAll);
            } else {
                classList = classList.substring(0, indexOfAll) + ' filter-all';
            }
            $elementsContainer.attr('class', classList);
            $this.parent().siblings().removeClass('highlight');
        } else {
            $elementsContainer.toggleClass(filterValue);
            $elementsContainer.removeClass('filter-all');
            $("[data-filter='filter-all']").parent().removeClass('highlight');
        }
    }

    function bindEvents() {
        $controls.on('click', handleClickOnControls);
    }

    function init() {
        $component = $('.filter-component');
        $elementsContainer = $('.filter-gallery');
        $controls = $('.filter-control');

        if (!$component.length || !$elementsContainer || !$controls) return;

        bindEvents();
    }

    return {
        init: init
    };

}();
