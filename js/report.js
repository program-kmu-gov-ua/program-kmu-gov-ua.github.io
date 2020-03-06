let reportTop100 = $('.menu-anchor').hasClass('report-top-100') ? true : false;

var hash = window.location.hash.substr(1),
    result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});

if (window.location.hash) {
    $('[href="' + window.location.hash + '"]').addClass('active').parents('.sub-node').slideDown(200);
}

$(document).on('click', '.collapse-report-menu .main-node .sub-node li a', function (e) {
    window.location.hash = $(this).attr('rel');
    return false;
});

$(document).on('click', '.collapse-report-menu .main-node', function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $('.sub-node', this).slideUp(200);
        $(this).removeClass('active')
    } else {
        if(!reportTop100) {
            $('.main-node.active').find('.sub-node').slideUp(200);
            $('.main-node.active').removeClass('active');
        }

        $('.sub-node', this).slideDown(200);
        $(this).addClass('active');
        window.location.hash = $('a', this).attr('rel');
    }
});

$(".navigation ul li a").click(function (e) {
    e.preventDefault();
    $(".navigation ul li a").removeClass("active");
    var aid = $(this).attr('rel');

    scrollToAnchor(aid);

    window.location.hash = aid;
    $(this).addClass("active");

    closeNavigation();
});

function scrollToAnchor(aid) {
    var aTag = $("div[id='" + aid + "']");
    $('html, body').animate({scrollTop: aTag.offset().top - 70}, 'slow');
}

$('.btn-navigation').on('click', function () {
    showNavigation();
});

$(document).on('click', '.close-btn-navigation', function () {
    closeNavigation();
});

function showNavigation() {
    $('.navigation').addClass('show-navigation');
    let menuAnchor = $('.menu-anchor');
    menuAnchor.css('position', 'unset');
    $('.show-navigation').css({
        'width': '100%',
        'left': '0'
    });
    setTimeout(function () {
        menuAnchor.removeClass('hidden-xs');
        let img = '<img class="close-btn-navigation" src="/files/group.svg" alt="alt">';
        menuAnchor.append(img);
        $('.menu-anchor > li > a').addClass('molile-menu-anchor-link');
    }, 400);
    $('.navbar_box').addClass('hidden');
    $('.btn-navigation').addClass('hidden');
}

function closeNavigation() {
    $('.menu-anchor').addClass('hidden-xs');
    $('.close-btn-navigation').remove();
    $('.menu-anchor > li > a').removeClass('molile-menu-anchor-link');
    $('.btn-navigation').removeClass('hidden');
    $('.navbar_box').removeClass('hidden');
    $('.show-navigation').css({
        'width': '0',
        'left': '-50px'
    });
    setTimeout(function () {
        $('.navigation').removeClass('show-navigation');
    }, 400);
}



enableDocumentScroll();

let defaultPositionMenu = $('.menu-anchor').scrollTop();
let scrollPositionMenu;
$('.menu-anchor').scroll(function () {
    let currentScrollPositionY = document.querySelector('.menu-anchor').scrollTop;
    let currentScrollPositionYMax = document.querySelector('.menu-anchor').scrollTopMax;

    scrollPositionMenu = $('.menu-anchor').scrollTop();
});

function shoudDocumentScroll() {
    let currentScrollPositionY = document.querySelector('.menu-anchor').scrollTop;
    let currentScrollPositionYMax = document.querySelector('.menu-anchor').scrollTopMax;

    console.log(scrollPositionMenu, defaultPositionMenu);
    if (scrollPositionMenu != defaultPositionMenu) {
        console.log('scrollDown');
        if(currentScrollPositionY === currentScrollPositionYMax) {
            console.log('BOTTOM');
        }
    } else {
        console.log('scrollUp', currentScrollPositionY);
        if(currentScrollPositionY === 0) {
            console.log('TOP');
            // disableDocumentScroll();
            console.log(Number(window.scrollY.toFixed()));
            window.scrollTo(0, Number(window.scrollY.toFixed()));
        }
    }
}

let id;
let ids = [];
function enableDocumentScroll() {
    $(document).bind('scroll', handlerDocumentScroll);
}


let mousePosition = {};
let xMousePos = 0;
let yMousePos = 0;
let lastScrolledLeft = 0;
let lastScrolledTop = 0;

$(document).mousemove(function(event) {
    captureMousePosition(event);
})

function captureMousePosition(event){
    xMousePos = event.pageX;
    yMousePos = event.pageY;
    mousePosition.x = xMousePos;
    mousePosition.y = yMousePos;
}

function handlerDocumentScroll(e) {

    if(lastScrolledLeft != $(document).scrollLeft()){
        xMousePos -= lastScrolledLeft;
        lastScrolledLeft = $(document).scrollLeft();
        xMousePos += lastScrolledLeft;
    }
    if(lastScrolledTop != $(document).scrollTop()){
        yMousePos -= lastScrolledTop;
        lastScrolledTop = $(document).scrollTop();
        yMousePos += lastScrolledTop;
    }
    mousePosition.x = xMousePos;
    mousePosition.y = yMousePos;

    // let qwe = e;

    // shoudDocumentScroll();

    // console.log('handlerDocumentScroll');
    let contentItems = $(".report-block div[id]");
    ids = [];
    for(let i = 0; i < contentItems.length; i++) {
        let contentItemID = contentItems[i].id;
        if(contentItemID && ($(window).scrollTop().toFixed() > $("#" + contentItemID)[0].offsetTop) ) {
            ids.push(contentItemID);

        }
    }
    id = ids[ids.length - 1];

    clearTimeout( $.data( this, "scrollCheck" ) );
    $.data( this, "scrollCheck", setTimeout(function() {
        // console.log(qwe);
        dom();
    }, 250) );
}

let scrollPositionY;
function disableDocumentScroll() {
    // console.log('unbind scroll document000');
    $(document).unbind('scroll', handlerDocumentScroll);
    scrollPositionY = Number(window.scrollY.toFixed());
}

function dom() {
	let menuItem = $('.sub-node a[href="#' + id + '"]');

	$('.sub-node a.active').removeClass('active');
	menuItem.addClass('active');

	if(!reportTop100) {
        $('.main-node').removeClass('active');
        menuItem.parents('.main-node').addClass('active');
        menuItem.parents('.sub-node').slideDown(200);
    }


	// let timestamp = Date.now();
	// menuItem.parents('.sub-node').attr('timestamp', timestamp);


    /* Go scroll menu after scrolling content */
    let tillNodeTitle = $('.main-node.active').prevAll('.node-title');
    let heightNodeTitle = 0;
    tillNodeTitle.each(function(index, value) {
        heightNodeTitle += value.offsetHeight;
    });

    let mainNodes = document.querySelectorAll('.main-node:not(.active)');
    // let active = document.querySelector('.main-node.active');
    let active = $('.sub-node a.active').parents('.main-node.active')[0];
    let tillIndexUl = Array.prototype.slice.call(mainNodes).indexOf(active);
    let heightUls = 0;
    $('.main-node').each(function(index) {
        if(index >= tillIndexUl) return false;
        heightUls += $('.main-node').eq(index).children('a').height();
    });
    console.log('heightUls', heightUls);

    let mainNodesActivePrev = $('.sub-node a.active').parents('.main-node').prevAll('.main-node.active');
    let heightMainNodesActivePrev = 0;
    mainNodesActivePrev.each(function(index, value) {
      heightMainNodesActivePrev += $('.main-node.active').eq(index).height();
    });
    // console.log($('.sub-node a.active').parents('.main-node.active'));
    // console.log('heightMainNodesActivePrev', heightMainNodesActivePrev);
    heightUls = heightUls + heightMainNodesActivePrev;

    // console.log(heightUls, heightMainNodesActivePrev);
    // console.log('\n\n');

    let tillIndexLi = $('.sub-node a.active').parent('li').index();
    let heightLis = 0;
    for(let i = tillIndexLi; i > 0; i--) {
    	heightLis += $('.sub-node a.active').parents('.main-node.active').find('li').eq(i).height();
    }

    if(!reportTop100) {
        $('.collapse-report-menu').animate({scrollTop: heightUls + heightLis + heightNodeTitle}, 'slow', function() {
                $.each($('.main-node').not('.active'), function(key, value) {
                    let subNode = $(this).find('ul.sub-node');
                    subNode.slideUp(200);
                    // subNode.removeAttr('timestamp');
                });
        });
    }

    if(reportTop100) {
        let from = $('.report-top-100').offset().left;
        let to = $('.report-top-100').offset().left + $('.report-top-100').outerWidth();
        if(mousePosition.x < from || mousePosition.x > to) {
            console.log(heightUls, heightLis, heightNodeTitle);
            $('.collapse-report-menu').animate({scrollTop: Math.round(heightUls + heightLis + heightNodeTitle)}, 'slow');
            // $('.main-node').removeClass('active');
            // menuItem.parents('.main-node').addClass('active');
            // menuItem.parents('.sub-node').slideDown(200);
            // console.log('FUCK YEAH');

            // Open when scrolling right sidebarr
            menuItem.parents('.main-node').addClass('active');
            menuItem.parents('.sub-node').slideDown(200);
            //

        } else {
            // console.log('FREEZE');
        }
        // let content = document.getElementById('content');
        // console.log(content.getBoundingClientRect());

        // document.getElementById('content').onmousemove  = function(e)   {
        //     console.log('qwe');
           // $('.collapse-report-menu').animate({scrollTop: heightUls + heightLis + heightNodeTitle}, 'slow');
        // };
    }
}
