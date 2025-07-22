// common.js

$(document).ready(function() {
    // Load header
    $("#header-container").load("includes/header.html", function() {
        // Header loaded callback
        initializeHeader();
    });

    // Load footer
    $("#footer-container").load("includes/footer.html", function() {
        // Footer loaded callback
        initializeFooter();
    });

    // Initialize common components
    initializeCommonComponents();
});

function initializeHeader() {
    // Header-specific initialization
    // e.g., set active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    $('.nav-link').each(function() {
        if ($(this).attr('href') === currentPage) {
            $(this).addClass('active');
        }
    });
}

function initializeFooter() {
    // Footer-specific initialization
}

function initializeCommonComponents() {
    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    
    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Preloader
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow');
    });

    // Initialize particles.js if needed
    if (typeof particlesJS !== 'undefined' && $('#particles-js').length) {
        particlesJS.load('particles-js', 'js/particles-config.json');
    }
}