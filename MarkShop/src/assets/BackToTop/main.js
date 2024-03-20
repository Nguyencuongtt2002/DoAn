$(document).ready(function() {
    var backTop = $('.js-cd-top'),
        offset = 300,
        offsetOpacity = 1200,
        scrollDuration = 700,
        scrolling = false;

    if (backTop.length) {
        // Update back to top visibility on scrolling
        $(window).scroll(function() {
            if (!scrolling) {
                scrolling = true;
                (!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
            }
        });

        // Smooth scroll to top
        backTop.on('click', function(event) {
            event.preventDefault();
            (!window.requestAnimationFrame) ? $('html, body').animate({ scrollTop: 0 }, scrollDuration) : $('html, body').animate({ scrollTop: 0 }, scrollDuration);
        });
    }

    function checkBackToTop() {
        var windowTop = $(window).scrollTop();
        (windowTop > offset) ? backTop.addClass('cd-top--is-visible').removeClass('cd-top--fade-out') : backTop.removeClass('cd-top--is-visible cd-top--fade-out');
        (windowTop > offsetOpacity) && backTop.addClass('cd-top--fade-out');
        scrolling = false;
    }
});
