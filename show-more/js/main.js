document.addEventListener('DOMContentLoaded', function(){
    var init = new ViewMoreComponent({
        component: ".comments-component",
        elements: ".comment",
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
            elementsToLoad: 2,
            initialVisibleElements: 2
        }
    });
});
