$(document).ready(function ($) {

    //VIEW BTN
    $('.btn-th').on('click', function () {
        $('#view-block').removeClass('list-view-block');
        $(this).addClass('active');
        $('.btn-list').removeClass('active');
    });

    $('.btn-list').on('click', function () {
        $('#view-block').addClass('list-view-block');
        $(this).addClass('active');
        $('.btn-th').removeClass('active');
    });

    $('.moretext').click(function(e) {
        e.preventDefault();
        $(this).closest('div').toggleClass('open');
    });
    $('[data-toggle="tooltip"]').tooltip();

    $('.collapse-title').click(function() {
        $(this).closest('.collapse-block').find('.collapse-desc').slideToggle();
        $(this).toggleClass('collapse-open')
    });
});

let backBtn = document.getElementById("back-btn");

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backBtn.style.display = "block";
    } else {
        backBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}