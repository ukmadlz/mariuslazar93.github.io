$(function(){
    var filterComp = new FilterComponent({
        component: '.filter-component',
        elementsContainer: '.filter-gallery',
        controls: '.filter-control'
    });

    var $singleFilter = $('.js-filter-single');
    var $multipleFilter = $('.js-filter-multiple');
    var $resetFilter = $('.js-filter-reset');

    $singleFilter.on('click', function(){
        filterComp.changeFiltering('single');
        $singleFilter.addClass('highlight');
        $multipleFilter.removeClass('highlight');
    });
    $multipleFilter.on('click', function(){
        filterComp.changeFiltering('multiple');
        $multipleFilter.addClass('highlight');
        $singleFilter.removeClass('highlight');
    });
    $resetFilter.on('click', function(){
        filterComp.reset();
    });
});
