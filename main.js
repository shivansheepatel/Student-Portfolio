/* main.js — Portfolio interactions */

/* ── Page-exit animation ─────────────────────────────── */
document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;
    link.addEventListener('click', e => {
        e.preventDefault();
        document.body.classList.add('exiting');
        setTimeout(() => { window.location = href; }, 230);
    });
});

/* ── Scroll reveal ───────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Skill bar fill (on About page) ─────────────────── */
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.dataset.pct || '0%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(el => skillObserver.observe(el));

/* ── RPG stat bar fill (game panel) ─────────────────── */
const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.dataset.pct || '0%';
            statObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.gs-stat-bar-fill').forEach(el => statObserver.observe(el));

/* ── Contact form ────────────────────────────────────── */
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', e => {
        // Show success message; let form submit naturally to Formspree (action attr)
        const success = document.getElementById('form-success');
        if (success) success.style.display = 'block';
        const btn = form.querySelector('.submit-btn');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Sent';
            btn.style.opacity = '0.6';
        }
        // Do not call e.preventDefault() — let the form POST to Formspree
        // If JS fails entirely, the action attribute handles submission as fallback
    });
}

/* ── Lightbox ────────────────────────────────────────── */
(function () {
    const overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.innerHTML = '<div id="lightbox-inner"><img id="lightbox-img" src="" alt=""><button id="lightbox-close" aria-label="Close">&times;</button></div>';
    document.body.appendChild(overlay);

    function open(src, alt) {
        document.getElementById('lightbox-img').src = src;
        document.getElementById('lightbox-img').alt = alt || '';
        overlay.classList.add('lb-open');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        overlay.classList.remove('lb-open');
        document.body.style.overflow = '';
    }

    document.getElementById('lightbox-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    document.querySelectorAll('img.card-photo, .showcase-card img, .paper-card img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => open(img.src, img.alt));
    });
})();

/* ── Folder hover tilt ───────────────────────────────── */
document.querySelectorAll('.folder').forEach(folder => {
    folder.addEventListener('mousemove', e => {
        const rect = folder.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
        folder.style.transform = `translateY(-10px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    folder.addEventListener('mouseleave', () => {
        folder.style.transform = '';
    });
});
