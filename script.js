/* ============================================
   SHIPSTACK - MINIMAL JAVASCRIPT
   Navigation and interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile nav when clicking a link
        const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !navToggle.contains(event.target)) {
                mobileNav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, href);
            }
        });
    });
    
    // ============================================
    // COPY INSTALL COMMAND
    // ============================================
    window.copyInstallCommand = function() {
        const code = document.querySelector('.install-code code');
        if (code) {
            const text = code.textContent;
            navigator.clipboard.writeText(text).then(function() {
                const button = document.querySelector('.code-copy');
                if (button) {
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    button.style.background = '#10b981';
                    button.style.color = 'white';
                    button.style.borderColor = '#10b981';
                    
                    setTimeout(function() {
                        button.textContent = originalText;
                        button.style.background = '';
                        button.style.color = '';
                        button.style.borderColor = '';
                    }, 2000);
                }
            }).catch(function(err) {
                console.error('Failed to copy:', err);
            });
        }
    };
    
    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
});