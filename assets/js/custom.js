$(document).ready(function() {











    // Kiểm tra trình duyệt có hỗ trợ Intersection Observer API không
    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let elementTop = entry.boundingClientRect.top;
                    let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                    if (elementTop <= viewportHeight) {
                        $(entry.target).addClass('in-viewport');
                    }
                } else {
                    setTimeout(() => {
                        $(entry.target).removeClass('in-viewport');
                    }, 5000); // 10 giây
                }
            });
        }, { threshold: [0, 0.33, 1] });

        // Quan sát các phần tử với class 'element-to-watch'
        $('.element-to-viewport').each(function() {
            observer.observe(this);
        });
    } else {
        // Fallback cho các trình duyệt không hỗ trợ Intersection Observer
        $(window).on('scroll', function() {
            $('.element-to-viewport').each(function() {
                let $this = $(this);
                if (isElementInThirdViewport(this)) {
                    $this.addClass('in-viewport');
                } else {
                    // setTimeout(() => {
                    //     $this.removeClass('in-viewport');
                    // }, 10000); // 10 giây
                }
            });
        });

        function isElementInThirdViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
    }
});