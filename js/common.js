// Function to load header
function loadHeader() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;
  
  headerContainer.innerHTML = `
    <header class="main-header sticky-top">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
          <a class="navbar-brand" href="index.html">
            <img src="logo.jpeg" alt="SkyAlpha HD" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="index.html">
                  <span class="nav-link-inner" >Home</span>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="summitsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Summits
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="2024Summit_v1.html">2024 Summit</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="2025speakers.html">2025 Summit</a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="past-summits.html">All Summits</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="live.html">Live</a>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="eventDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Event
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="live.html">Live</a></li>
                  <li>
                    <a class="dropdown-item" href="sessions.html">Sessions</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="schedule_v1.html">Schedule</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="speakers.html">Speakers</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="universities.html">Universities</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="partnersDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Partners
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="universities.html">Universities</a>
                  </li>
                  <!--
                  <li>
                    <a class="dropdown-item" href="partners.html">Organizations</a>
                  </li>
                  -->
                  <li>
                    <a class="dropdown-item" href="sponsors.html">Sponsors</a>
                  </li>
                  <!--
                  <li>
                    <a class="dropdown-item" href="collaborators.html">Collaborators</a>
                  </li>
                  -->
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="contactDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Contact
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="contact.html">Contact Us</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="team_v1.html">Our Team</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="developers.html">Developers</a>
                  </li>
                  <li><a class="dropdown-item" href="faq.html">FAQs</a></li>
                </ul>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
            </ul>
            <a href="register_v1.html" class="btn btn-primary ms-lg-3">Register Now</a>
          </div>
        </div>
      </nav>
      
      <!-- Announcement Banner -->
      <!-- <div id="announcement-banner" class="bg-primary text-white text-center py-1">
        <div id="announcement-collapse" class="collapse show">
          <div class="px-2 py-1 d-flex flex-column flex-md-row justify-content-center align-items-center">
            <strong class="me-md-2" style="font-size:0.9rem;">Registration for the 24th July 2025 Summit is now open!</strong>
            <span class="me-md-3" style="font-size:0.85rem;">You’ll receive an email and site notification once your registration is received.</span>
            <a href="register_v1.html" class="btn btn-light btn-sm" style="font-size:0.75rem; padding:0.25rem 0.5rem;">Register Now</a>
          </div>
        </div>

        <button
          id="toggle-announcement"
          class="btn btn-sm btn-light mt-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#announcement-collapse"
          aria-expanded="true"
          aria-controls="announcement-collapse"
          style="font-size:1rem; width:24px; height:24px; line-height:24px; padding:0;"
        >▼</button>
      </div> -->
    </header>`;
  
  // Toggle banner visibility with CSS class
//   const collapseEl = document.getElementById('announcement-collapse');
//   const toggleBtn  = document.getElementById('toggle-announcement');

//   collapseEl.addEventListener('show.bs.collapse', () => {
//     toggleBtn.textContent = '▼';  // down‑caret when expanded
//   });
//   collapseEl.addEventListener('hide.bs.collapse', () => {
//     toggleBtn.textContent = '▲';  // up‑caret when collapsed
//   });

//   setActiveNav();
}

// Function to load footer
function loadFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;
  
  footerContainer.innerHTML = `
    <footer class="main-footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-5 mb-lg-0">
            <a href="https://www.skyalphahd.com" target="_blank" rel="noopener noreferrer">
              <img src="images/logos/skyalpha.png" alt="SkyAlpha HD" class="footer-logo img-fluid">
            </a>
            <p class="footer-about">
              Aligned with Lesotho's National Digital Transformation Strategy,
              the Digital Innovators Summit is a movement toward creating a
              digitally empowered society.
            </p>
            <div class="social-links">
              <a href="https://www.facebook.com/DigitalInnovatorsSummitLesotho" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/DIS_Lesotho2025" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/digitalinnovatorslesotho" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/company/digital-innovators-summit-lesotho" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
              <a href="https://www.youtube.com/c/DigitalInnovatorsSummitLesotho" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
            <div class="footer-links">
              <h5>Summits</h5>
              <ul>
                <li><a href="2024Summit_v1.html">2024 Summit</a></li>
                <li><a href="2025speaker.html">2025 Summit</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
            <div class="footer-links">
              <h5>Event</h5>
              <ul>
                <li><a href="schedule_v1.html">Schedule</a></li>
                <li><a href="speakers.html">Speakers</a></li>
                <li><a href="sessions.html">Sessions</a></li>
                <li><a href="live.html">Live Stream</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
            <div class="footer-links">
              <h5>Partners</h5>
              <ul>
                <li><a href="universities.html">Universities</a></li>
                <!-- <li><a href="partners.html">Organizations</a></li> -->
                <li><a href="sponsors.html">Sponsors</a></li>
                <!-- <li><a href="collaborators.html">Collaborators</a></li> -->
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-4">
            <div class="footer-links">
              <h5>Contact</h5>
              <ul>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="team_v1.html">Our Team</a></li>
                <li><a href="register_v1.html">Register</a></li>
                <li><a href="faq.html">FAQs</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <p class="copyright mb-3 mb-md-0">
                  © 2025 Digital Innovators Summit. All rights reserved.
                </p>
              </div>
              <div class="col-md-6 text-md-end">
                <a href="privacy.html" class="text-white-50 me-3">Privacy Policy</a>
                <a href="terms.html" class="text-white-50">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Set active navigation item
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
      
      // Special handling for active states
      if (linkPage === 'index.html') {
        link.classList.add('active-home');
      } else if (linkPage === 'live.html') {
        link.classList.add('active-live');
      }
    }
  });
}

// Initialize common elements
function initCommonElements() {
  loadHeader();
  loadFooter();
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (header && window.scrollY > 50) {
      header.classList.add('scrolled');
    } else if (header) {
      header.classList.remove('scrolled');
    }
  });
  
  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // If mobile menu is open and click is outside navbar
    if (navbarCollapse.classList.contains('show') && 
        !event.target.closest('.navbar') && 
        !event.target.classList.contains('navbar-toggler')) {
        
        // Close the menu
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        bsCollapse.hide();
        
        // Change the toggler icon back to three lines
        navbarToggler.setAttribute('aria-expanded', 'false');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset considering fixed header
            const offset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCommonElements);