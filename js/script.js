
// ============================================
// PAGE ROUTING (SPA)
// ============================================
function showPage(pageId) {
document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
const target = document.getElementById('page-' + pageId);
if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Update nav active states
document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
const navEl = document.getElementById('nav-' + pageId);
if (navEl) navEl.classList.add('active');

// Re-trigger reveal animations
setTimeout(triggerReveals, 100);
}

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================
// MOBILE MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
mobileMenu.classList.add('open');
hamburger.setAttribute('aria-expanded', 'true');
});

function closeMobile() {
mobileMenu.classList.remove('open');
hamburger.setAttribute('aria-expanded', 'false');
}
mobileClose.addEventListener('click', closeMobile);

// ============================================
// SCROLL REVEAL
// ============================================
function triggerReveals() {
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
        setTimeout(() => {
        entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => {
    if (!el.classList.contains('visible')) {
    observer.observe(el);
    }
});
}
// Initial trigger
setTimeout(triggerReveals, 200);

// ============================================
// PARTICLE CANVAS — Hero Background
// ============================================
(function initParticles() {
const canvas = document.getElementById('particle-canvas');
if (!canvas) return;
const ctx = canvas.getContext('2d');
let W, H, particles = [];
const PARTICLE_COUNT = 60;

function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
}

function createParticle() {
    return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '0,245,255' : '192,38,211',
    };
}

function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
}

function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,245,255,${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        }
    }
    }
    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); });
init();
draw();
})();

// ============================================
// PORTFOLIO FILTER
// ============================================
function filterPortfolio(cat, btn) {
document.querySelectorAll('.portfolio-filter').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
document.querySelectorAll('.portfolio-item').forEach(item => {
    const cats = item.getAttribute('data-cat') || '';
    if (cat === 'all' || cats.includes(cat)) {
    item.classList.remove('hidden');
    } else {
    item.classList.add('hidden');
    }
});
}

// ============================================
// FORM SUBMIT (Demo)
// ============================================
function submitForm(e) {
e.preventDefault();
const firstName = document.getElementById('firstName').value.trim();
const lastName = document.getElementById('lastName').value.trim();
const email = document.getElementById('email').value.trim();
const phone = document.getElementById('phone').value.trim();
const service = document.getElementById('service').value.trim();
const budget = document.getElementById('budget').value.trim();
const message = document.getElementById('message').value.trim();

if (!firstName || !email || !message) {
    // Simple shake effect on empty required fields
    [document.getElementById('firstName'), document.getElementById('email'), document.getElementById('message')].forEach(el => {
    if (!el.value.trim()) {
        el.style.borderColor = 'rgba(192,38,211,0.6)';
        el.style.boxShadow = '0 0 0 3px rgba(192,38,211,0.1)';
        setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 2000);
    }
    });
    return;
}

// Disable submit button to prevent double submissions
const submitBtn = event.target;
submitBtn.disabled = true;
submitBtn.style.opacity = '0.6';

// Create FormData object for Formspree
const formData = new FormData();
formData.append('firstName', firstName);
formData.append('lastName', lastName);
formData.append('email', email);
formData.append('phone', phone);
formData.append('service', service);
formData.append('budget', budget);
formData.append('message', message);

// Submit to Formspree
fetch('https://formspree.io/f/xwvjpldg', {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => {
    if (response.ok) {
        document.getElementById('formContent').style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
    } else {
        alert('There was an error sending your message. Please try again.');
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
})
.catch(error => {
    console.error('Error:', error);
    alert('There was an error sending your message. Please try again.');
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
});
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================
(function initCursorGlow() {
const glow = document.createElement('div');
glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    mix-blend-mode: screen;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
})();

