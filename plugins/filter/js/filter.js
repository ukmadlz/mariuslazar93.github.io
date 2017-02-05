(function(global, $) {

    var FilterComponent = function(options) {
        var $component,
            $elementsContainer,
            $controls,
            $filterAllControl,
            $otherControls,
            opts;

        var defaults = {
            component: '.filter-component',
            elementsContainer: '.filter-gallery',
            controls: '.filter-control'
        };

        function handleClickOnControls(e) {
            e.preventDefault();
            var $this = $(this),
                filterValue = $this.attr('data-filter'),
                galleryFilterData = $elementsContainer.attr('data-filter');

            $this.toggleClass('highlight');

            if (filterValue === 'filter-all') {
                if ($elementsContainer.attr('data-filter') === 'filter-all') {
                    $elementsContainer.attr('data-filter', '');
                } else {
                    $elementsContainer.attr('data-filter', 'filter-all');
                    $otherControls.removeClass('highlight');
                }
            } else {
                galleryFilterData = toggleString(galleryFilterData, filterValue);
                galleryFilterData = removeString(galleryFilterData, 'filter-all');
                $elementsContainer.attr('data-filter', galleryFilterData);
                $filterAllControl.removeClass('highlight');
            }
        }

        function toggleString(str, strToToggle) {
            var indexOfFilterValue = str.indexOf(strToToggle);
            if (indexOfFilterValue > -1) {
                if (indexOfFilterValue === 0) {
                    str = str.substring(strToToggle.length + 1);
                } else {
                    str = str.substring(0, indexOfFilterValue) + str.substring(indexOfFilterValue + strToToggle.length + 1);
                }
            } else {
                str = str.length === 0 ? strToToggle : (str + ' ' + strToToggle);
            }
            return str;
        }

        function removeString(str, strToRemove) {
            var indexStrToRemove = str.indexOf(strToRemove);
            if (indexStrToRemove > -1) {
                if (indexStrToRemove === 0) {
                    str = str.substring(strToRemove.length + 1);
                } else {
                    str = str.substring(0, indexStrToRemove) + str.substring(indexStrToRemove + strToRemove.length + 1);
                }
            }
            return str;
        }

        function bindEvents() {
            $controls.on('click', handleClickOnControls);
        }

        function init(options) {
            opts = $.extend({}, defaults, options || {});

            $component = $(opts.component);
            $elementsContainer = $(opts.elementsContainer, $component);
            $controls = $(opts.controls, $component);
            $filterAllControl = $(opts.controls + "[data-filter='filter-all']", $component);
            $otherControls = $controls.not("[data-filter='filter-all']");
            if (!$component.length || !$elementsContainer || !$controls) return;

            bindEvents();
        }

        init(options);
    };

    if (global.FilterComponent) {
        console.log('FilterComponent already exist!');
    } else {
        global.FilterComponent = FilterComponent;
    }
}(this, jQuery));
