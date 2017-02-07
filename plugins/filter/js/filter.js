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
            controls: '.filter-control',
            singleFiltering: true
        };

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

        function handleSingleFiltering(e) {
            e.preventDefault();
            var $this = $(this),
                filterValue = $this.attr('data-filter');

            if ($this.hasClass('highlight')) {
                $this.removeClass('highlight');
                $elementsContainer.attr('data-filter', '');
            } else {
                $controls.each(function() {
                    var $current = $(this);
                    if ($current != $this) {
                        $current.removeClass('highlight');
                    }
                })
                $this.addClass('highlight');
                $elementsContainer.attr('data-filter', filterValue);
            }
        }

        function handleMultipleFiltering(e) {
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

        function changeFiltering(newOption) {
            resetFilter();
            if (opts.singleFiltering) {
                $controls.off('click', handleSingleFiltering);
                opts.singleFiltering = false;
            } else {
                $controls.off('click', handleMultipleFiltering);
                opts.singleFiltering = true;
            }

            switch (newOption) {
                case 'single':
                    $controls.on('click', handleSingleFiltering);
                    break;
                case 'multiple':
                    $controls.on('click', handleMultipleFiltering);
                    break;
                default:
                    console.log('Option not available');
            }
        }

        function resetFilter() {
            $elementsContainer.attr('data-filter', 'filter-all');
            $filterAllControl.addClass('highlight');
            $otherControls.removeClass('highlight');
        }

        function bindEvents(opt) {
            if (opts.singleFiltering) {
                $controls.on('click', handleSingleFiltering);
            } else {
                $controls.on('click', handleMultipleFiltering);
            }
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
        
        return {
            changeFiltering: changeFiltering,
            reset: resetFilter
        }
    };

    if (global.FilterComponent) {
        console.log('FilterComponent already exist!');
    } else {
        global.FilterComponent = FilterComponent;
    }
}(this, jQuery));
