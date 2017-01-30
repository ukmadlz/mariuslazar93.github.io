function ViewMoreComponent(settings) {
    var $component,
        $elements,
        $moreBtn,
        $lessBtn,
		$window,
        totalSize,
        options,
        currentState,
        visibleElements,
        initialVisibleElements,
        elementsToLoad,
        isLastRow,
        disableSameHeight,
        elementsOnLastRow;

	var defaults = {
		component: '.view-more-component',
		elements: '.view-more-element',
		moreBtn: '.view-more',
		lessBtn: '.view-less',
		mobile: {
			breakpoint: 768,
			elementsToLoad: 1,
			initialVisibleElements: 1
		},
		tablet: {
			breakpoint: 992,
			elementsToLoad: 2,
			initialVisibleElements: 2
		},
		desktop: {
			elementsToLoad: 3,
			initialVisibleElements: 3
		}
	};

    function handleResize() {
        $elements.hide();
        $moreBtn.off();
        $lessBtn.off();
        $lessBtn.hide();
        isLastRow = false;
        initOptions();
        loadContent();
    }

    function debounce(fn, delay){
        var timer;

        return function(){
            var context = this;
            var args = arguments;

            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context, args);
                timer = null;
            }, delay);
        }
    }

    function showItems(e) {
        e.preventDefault();

        var nextVisibleElements,
            elementsToShow;

        nextVisibleElements = ((visibleElements + elementsToLoad) <= totalSize) ? (visibleElements + elementsToLoad) : totalSize;
        elementsToShow = $elements.slice(visibleElements, nextVisibleElements).slideDown('fast');

        $lessBtn.show();

        if (nextVisibleElements == totalSize) {
            $moreBtn.hide();
            isLastRow = true;
            elementsOnLastRow = totalSize - visibleElements;
        } else {
            isLastRow = false;
        }
        visibleElements = nextVisibleElements;
    }

    function hideItems(e) {
        e.preventDefault();

        var nextVisibleElements,
            elementsToShow;

        if (isLastRow) {
            nextVisibleElements = visibleElements - elementsOnLastRow;
            isLastRow = false;
        } else {
            nextVisibleElements = visibleElements - elementsToLoad;
        }

        elementsToShow = $elements.slice(nextVisibleElements, visibleElements).slideUp('fast');
        visibleElements = nextVisibleElements;

        if (visibleElements <= elementsToLoad) {
            $lessBtn.hide();
        }

        if (!$moreBtn.is(":visible")) {
            $moreBtn.show();
        }
    }

    function bindEvents() {
        $moreBtn.on('click', showItems);
        $lessBtn.on('click', hideItems);
        $window.resize(debounce(handleResize,100));
    }

    function loadContent() {
        $elements.slice(0, initialVisibleElements).show();
        if (visibleElements >= totalSize) {
            $moreBtn.hide();
        } else {
            $moreBtn.show();
            bindEvents();
        }
    }


    /*
        elementsToLoad - elements to load
        initialVisibleElements - elements to show initialy
        visibleElements - visible elements counter
    */
    function initOptions() {
        if (window.innerWidth < options.mobile.breakpoint) {
            elementsToLoad = options.mobile.elementsToLoad;
            initialVisibleElements = options.mobile.initialVisibleElements;
            visibleElements = options.mobile.initialVisibleElements;
        } else if (window.innerWidth < options.tablet.breakpoint) {
            elementsToLoad = options.tablet.elementsToLoad;
            initialVisibleElements = options.tablet.initialVisibleElements;
            visibleElements = options.tablet.initialVisibleElements;
        } else {
            elementsToLoad = options.desktop.elementsToLoad;
            initialVisibleElements = options.desktop.initialVisibleElements;
            visibleElements = options.desktop.initialVisibleElements;
        }
        return true;
    }

    function init(settings) {
        options = $.extend(true,{},defaults, settings);
        $component = $(options.component);
        if ($component.length) {
            $elements = $component.find(options.elements);
            $window = $(window);
            totalSize = $elements.length;
            $moreBtn = $(options.moreBtn, $component);
            $lessBtn = $(options.lessBtn, $component);
            isLastRow = false;
            initOptions() && loadContent();
        }
    }
    init(settings);
};
