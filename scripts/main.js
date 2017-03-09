(function () {
    var menuTrigger = document.querySelector('.main-nav__trigger');
    var mainNavItem = document.querySelectorAll('.main-nav__item');

    mainNavItem.forEach(function (item) {
        item.addEventListener('click', function () {
            document.body.classList.toggle('open');
        });
    });
    menuTrigger.addEventListener('click', function () {
        document.body.classList.toggle('open');
    });


    var slideItems = document.querySelectorAll('.decorated-title');
    slideItems.forEach(function (item) {
        item.classList.add('active');
    });
})();