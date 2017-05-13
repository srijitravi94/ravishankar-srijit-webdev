var $item = $('.carousel .item');
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight);
$item.addClass('full-screen');

$('.carousel img').each(function() {
    var $src = $(this).attr('src');
    var $color = $(this).attr('data-color');
    $(this).parent().css({
        'background-image' : 'url(' + $src + ')',
        'background-color' : $color
    });
    $(this).remove();
});

$(window).on('resize', function (){
    $wHeight = $(window).height();
    $item.height($wHeight);
});

$('.carousel').carousel({
    interval: 3000,
    pause: "false"
});

$(document).click(function(e) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768){
        if (!$(e.target).is('a') && !$(e.target).is('input'))  {
            $('#collapsable-nav').collapse('hide');
        }
    }
});