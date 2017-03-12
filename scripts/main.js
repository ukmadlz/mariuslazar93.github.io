(function () {
    var menuTrigger = document.querySelector('.main-nav__trigger');
    var mainNavItem = document.querySelectorAll('.main-nav__item a');

    mainNavItem.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var startPoint = this.href.indexOf('#');
            var href = this.href.slice(startPoint);
            var toElement = document.querySelector(href);
            var toElementOffset = toElement.offsetTop;

            if(document.body.classList.contains('open')){
                toElementOffset -= 60;
            }
            document.body.classList.remove('open');

            scrollTo(document.body, toElementOffset, 500);
        });
    });
    menuTrigger.addEventListener('click', function () {
        document.body.classList.toggle('open');
    });


    var slideItems = document.querySelectorAll('.decorated-title');
    slideItems.forEach(function (item) {
        item.classList.add('active');
    });

    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        var timeout = setTimeout(function () {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop >= to) {
                clearTimeout(timeout);

            } else {
                scrollTo(element, to, duration - 10);
            }
        }, 10);
    }
})();