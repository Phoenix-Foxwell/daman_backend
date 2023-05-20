$(document).ready(function(){
    $('.close').click(function () {
        $('.navigation').removeClass('show')
    })
    $('.menu-btn').click(function () {
        $('.navigation').addClass('show')
    })

    $(window).scroll(function(){
        if ($(window).scrollTop() >= 300) {
            
            $('.nav-fix').addClass('visible-title');
            setTimeout(() => {
                $('.nav-fix').addClass('fixed-header');    
            }, 100);
        }
        else {
            $('.nav-fix').removeClass('fixed-header');
            $('.nav-fix').removeClass('visible-title');
        }
    });
})