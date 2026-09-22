/* ============================================
   PHP MODERNO - SCRIPTS
   Autor: Alisson Aguiar
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Smooth Scroll para links internos ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Animação de entrada com IntersectionObserver ---- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.glass-card, .feature-mini, .timeline-item, .pain-item')
        .forEach(el => observer.observe(el));

    /* ---- Navbar: esconder/mostrar no scroll ---- */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        }, { passive: true });
        navbar.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    /* ---- Scroll progress indicator (opcional) ---- */
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: linear-gradient(90deg, #6366F1, #A855F7, #F472B6);
        z-index: 9999;
        transition: width 0.1s ease-out;
        pointer-events: none;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / winHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });

    /* ---- Prism syntax highlight ---- */
    if (window.Prism) {
        Prism.highlightAll();
    }

    console.log('%c🚀 PHP Moderno', 'font-size: 20px; font-weight: bold; color: #6366F1;');
    console.log('%cPortfolio: Alisson Aguiar', 'font-size: 12px; color: #A855F7;');
    console.log('%cGitHub: https://github.com/Alisson-aguiar', 'font-size: 12px; color: #94A3B8;');
});