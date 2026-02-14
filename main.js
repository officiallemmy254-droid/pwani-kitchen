/* ============================
   PWANI KITCHEN — Main JS
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', updateActiveLink);

    // --- Mobile nav toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
        document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinksContainer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- Menu Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            menuCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- Reservation Form ---
    const reserveForm = document.getElementById('reserveForm');
    const reserveSuccess = document.getElementById('reserveSuccess');
    const newReservationBtn = document.getElementById('newReservation');

    // Set minimum date to today
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    reserveForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate processing
        const submitBtn = document.getElementById('reserveBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Processing...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            reserveForm.style.display = 'none';
            reserveSuccess.style.display = 'block';
            reserveSuccess.style.animation = 'fadeInUp 0.5s ease forwards';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    newReservationBtn.addEventListener('click', () => {
        reserveForm.reset();
        reserveForm.style.display = 'block';
        reserveSuccess.style.display = 'none';
    });

    // --- Newsletter Form ---
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail');
        showToast(`Thank you! ${email.value} has been subscribed.`);
        email.value = '';
    });

    // --- Toast Notification ---
    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll(
        '.about-grid, .menu-card, .reserve-grid, .events-banner, .testimonial-card, .newsletter-box, .contact-card, .section-header'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // --- Smooth scroll for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// --- CSS keyframe injection for JS animations ---
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
