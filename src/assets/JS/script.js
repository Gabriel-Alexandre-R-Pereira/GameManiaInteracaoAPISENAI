// Mobile and Tablet Menu

function MobileMenu() {
    var TopMenu = document.getElementById('TopMenu');
    
    if (!(TopMenu.hasAttribute('class'))) {
        TopMenu.setAttribute('class', 'ResponsiveTopMenu');

    } else {
        TopMenu.removeAttribute('class');
    }
}





// Banners Carousel

$(document).ready(function() {
    let interval = window.setInterval(RotateBanners, 5000);

    function RotateBanners() {
        let $FirstBanner = $('#Carousel').find('figure:first');
        let width = $FirstBanner.width();

        $FirstBanner.animate({marginLeft: -width}, 1000, function() {
            let $LastBanner = $('#Carousel').find('figure:last');
            
            $LastBanner.after($FirstBanner);
            $FirstBanner.css({marginLeft: 0});
        })
    }

    $('#LeftArrow').click(ToPreviousBanner);
    $('#RightArrow').click(ToNextBanner);

    function ToNextBanner() {
        window.clearInterval(interval);

        let $CurrentBanner = $('#Carousel').find('figure:first');
        let width = $CurrentBanner.width();

        $CurrentBanner.animate({marginLeft: -width}, 1000, function() {
            let $LastBanner = $('#Carousel').find('figure:last');

            $LastBanner.after($CurrentBanner);
            $CurrentBanner.css({marginLeft: 0});

            interval = window.setInterval(RotateBanners, 5000);
        })
    }

    function ToPreviousBanner() {
        window.clearInterval(interval);

        let $CurrentBanner = $('#Carousel').find('figure:first');
        let width = $CurrentBanner.width();
        let $PreviousBanner = $('#Carousel').find('figure:last');

        $PreviousBanner.css({marginLeft: -width});
        $CurrentBanner.before($PreviousBanner);

        $PreviousBanner.animate({marginLeft: 0}, 1000, function() {
            interval = window.setInterval(RotateBanners, 5000);
        })
    }
})