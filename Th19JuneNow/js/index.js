// Preloader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(function() {
    preloader.style.opacity = '0';
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500);
  }, 500);
});

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});

// Initialize Owl Carousel for Universities
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });
});

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add hover effect to dropdown menus
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
        const dropdownMenu = this.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.add('show');
        }
    });
    
    dropdown.addEventListener('mouseleave', function() {
        const dropdownMenu = this.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.remove('show');
        }
    });
});

// Add animation to cards on hover
document.querySelectorAll('.session-card, .summit-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;
        
        const centerX = this.offsetWidth / 2;
        const centerY = this.offsetHeight / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.ticker-track');
    if (!track) return;

    const items = track.querySelectorAll('.ticker-item');
    const prevBtn = document.querySelector('.ticker-prev');
    const nextBtn = document.querySelector('.ticker-next');
    const speed = parseInt(track.dataset.speed) || 50; // Get speed from data attribute
    
    // Clone items for infinite loop
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let currentPosition = 0;
    let autoScroll = true;
    let scrollInterval;
    const itemWidth = items[0].offsetWidth + 48; // 48px for gap (3rem)

    // Initialize ticker
    function initTicker() {
        if (window.innerWidth > 992) {
            // Desktop - manual controls + auto-scroll
            setupDesktopTicker();
        } else {
            // Mobile - continuous auto-scroll only
            setupMobileTicker();
        }
    }

    function setupDesktopTicker() {
        // Pause on hover
        track.addEventListener('mouseenter', () => {
            autoScroll = false;
            clearInterval(scrollInterval);
        });

        track.addEventListener('mouseleave', () => {
            autoScroll = true;
            startAutoScroll();
        });

        // Navigation controls
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                manualScroll(-1);
            });

            nextBtn.addEventListener('click', () => {
                manualScroll(1);
            });
        }

        startAutoScroll();
    }

    function setupMobileTicker() {
        // Mobile - continuous scroll animation handled by CSS
        // No manual controls needed
    }

    function manualScroll(direction) {
        clearInterval(scrollInterval);
        currentPosition += direction * itemWidth;
        
        // Boundary checks
        if (currentPosition > 0) currentPosition = -(items.length * itemWidth);
        if (currentPosition < -(items.length * itemWidth)) currentPosition = 0;
        
        animateScroll();
        
        // Restart auto-scroll after pause
        if (autoScroll) {
            setTimeout(startAutoScroll, 5000);
        }
    }

    function animateScroll() {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(${currentPosition}px)`;
        
        // Reset position when reaching clone items
        setTimeout(() => {
            if (currentPosition <= -(items.length * itemWidth)) {
                track.style.transition = 'none';
                currentPosition = 0;
                track.style.transform = `translateX(${currentPosition}px)`;
            }
        }, 500);
    }

    function startAutoScroll() {
        if (!autoScroll) return;
        
        scrollInterval = setInterval(() => {
            currentPosition -= itemWidth;
            animateScroll();
            
            // Reset to first item (not the clone)
            if (currentPosition <= -(items.length * itemWidth)) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentPosition = 0;
                    track.style.transform = `translateX(${currentPosition}px)`;
                }, 500);
            }
        }, 5000); // Change slide every 5 seconds
    }

    // Initialize based on screen size
    initTicker();
    
    // Re-initialize on resize
    window.addEventListener('resize', () => {
        clearInterval(scrollInterval);
        track.style.transition = 'none';
        currentPosition = 0;
        track.style.transform = 'translateX(0)';
        initTicker();
    });
});