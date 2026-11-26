// Portfolio de Mario Merveille Ligan : interactions (JavaScript natif, sans framework)
(function () {
    'use strict';

    var CAREER_START = 2022; // première mission professionnelle (CV : ONG Campus pour Christ)
    var EMAILJS = { serviceId: 'service_hva8mah', templateId: 'template_h689iia', userId: 'vN-HLiAD_dY93n1s3' };

    var root = document.documentElement;
    var body = document.body;
    var header = document.querySelector('.site-header');

    // ---------- Valeurs à jour chaque année ----------
    var year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
    document.querySelectorAll('[data-years]').forEach(function (el) { el.textContent = (year - CAREER_START) + '+'; });

    // ---------- Thème clair / sombre ----------
    var themeBtn = document.querySelector('.theme-toggle');
    function syncThemeButton() {
        if (!themeBtn) return;
        var dark = root.getAttribute('data-theme') !== 'light';
        themeBtn.setAttribute('aria-label', dark ? 'Passer en mode clair' : 'Passer en mode sombre');
        themeBtn.setAttribute('title', dark ? 'Mode clair' : 'Mode sombre');
        themeBtn.innerHTML = '<i class="fa-solid ' + (dark ? 'fa-sun' : 'fa-moon') + '" aria-hidden="true"></i>';
        document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
            m.setAttribute('content', dark ? '#070b14' : '#f6f7fb');
        });
    }
    syncThemeButton();
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.classList.add('theme-transition');
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { }
            syncThemeButton();
            setTimeout(function () { root.classList.remove('theme-transition'); }, 500);
        });
    }

    // ---------- Menu mobile ----------
    var menuBtn = document.querySelector('.menu-toggle');
    function setMenu(open) {
        header.classList.toggle('menu-open', open);
        body.classList.toggle('no-scroll', open);
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
            menuBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
            menuBtn.innerHTML = '<i class="fa-solid ' + (open ? 'fa-xmark' : 'fa-bars') + '" aria-hidden="true"></i>';
        }
    }
    if (menuBtn) {
        menuBtn.addEventListener('click', function () { setMenu(!header.classList.contains('menu-open')); });
    }

    // ---------- En-tête, bouton WhatsApp, lien actif ----------
    var fab = document.querySelector('.whatsapp-fab');
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
    var sections = navLinks.map(function (a) { return document.getElementById(a.getAttribute('data-nav')); }).filter(Boolean);
    var scrollTicking = false;
    function onScroll() {
        var y = window.scrollY;
        header.classList.toggle('is-scrolled', y > 40);
        if (fab) fab.classList.toggle('visible', y > 400);
        var current = null;
        sections.forEach(function (s) {
            var r = s.getBoundingClientRect();
            if (r.top <= 120 && r.bottom > 120) current = s.id;
        });
        navLinks.forEach(function (a) {
            var active = a.getAttribute('data-nav') === current;
            a.classList.toggle('active', active);
            if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
        scrollTicking = false;
    }
    window.addEventListener('scroll', function () {
        if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    // ---------- Défilement doux vers les ancres (compense l'en-tête fixe) ----------
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;
        var id = link.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        setMenu(false);
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var top = target.getBoundingClientRect().top + window.scrollY - (id === '#accueil' ? 0 : 72);
        window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
        if (history.replaceState) history.replaceState(null, '', id);
    });

    // ---------- Filtres des réalisations ----------
    var filterBtns = document.querySelectorAll('.filter');
    var cards = document.querySelectorAll('.project-card');
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var value = btn.getAttribute('data-filter');
            filterBtns.forEach(function (b) {
                var on = b === btn;
                b.classList.toggle('active', on);
                b.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
            cards.forEach(function (card) {
                var show = value === 'all' || card.getAttribute('data-category') === value;
                card.hidden = !show;
                if (show && window.gsap) {
                    gsap.fromTo(card, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity,visibility' });
                }
            });
        });
    });

    // ---------- Fenêtre « étude de cas » ----------
    var modal = document.getElementById('case-modal');
    var data = {};
    try { data = JSON.parse(document.getElementById('case-data').textContent); } catch (e) { }
    var lastFocus = null;

    function esc(s) {
        return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
    }

    function openCase(slug) {
        var p = data[slug];
        if (!p || !modal) return;
        lastFocus = document.activeElement;
        modal.querySelector('.case-title').textContent = p.title;
        modal.querySelector('.case-meta').textContent = p.meta;
        modal.querySelector('.case-domain').textContent = p.domain || p.title;
        var img = modal.querySelector('.case-image');
        img.src = p.image;
        img.alt = 'Aperçu du projet ' + p.title;
        modal.querySelector('.case-tags').innerHTML = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
        modal.querySelector('.case-details').textContent = p.details;
        var roleWrap = modal.querySelector('.case-role-wrap');
        roleWrap.hidden = !(p.role && p.role.length);
        modal.querySelector('.case-role').innerHTML = (p.role || []).map(function (r) {
            return '<li><i class="fa-solid fa-check" aria-hidden="true"></i> ' + esc(r) + '</li>';
        }).join('');
        var actions = '';
        if (p.demo) actions += '<a href="' + esc(p.demo) + '" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Voir en ligne <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>';
        if (p.github) actions += '<a href="' + esc(p.github) + '" class="btn btn-ghost btn-sm" target="_blank" rel="noopener"><i class="fa-brands fa-github" aria-hidden="true"></i> Code source</a>';
        modal.querySelector('.case-actions').innerHTML = actions;

        modal.hidden = false;
        body.classList.add('no-scroll');
        modal.querySelector('.modal-panel').scrollTop = 0;
        requestAnimationFrame(function () { requestAnimationFrame(function () { modal.classList.add('active'); }); });
        modal.querySelector('.modal-close').focus();
    }

    function closeCase() {
        if (!modal || modal.hidden) return;
        modal.classList.remove('active');
        body.classList.remove('no-scroll');
        setTimeout(function () { modal.hidden = true; }, 250);
        if (lastFocus) lastFocus.focus();
    }

    document.addEventListener('click', function (e) {
        var trigger = e.target.closest('[data-case]');
        if (trigger) { openCase(trigger.getAttribute('data-case')); return; }
        if (modal && (e.target === modal || e.target.closest('.modal-close'))) closeCase();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeCase(); setMenu(false); }
        // Garde le focus clavier dans la fenêtre ouverte
        if (e.key === 'Tab' && modal && !modal.hidden) {
            var f = modal.querySelectorAll('a[href], button:not([disabled])');
            if (!f.length) return;
            var first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    // ---------- Formulaire de contact (EmailJS) ----------
    var form = document.getElementById('contact-form');
    var lastSubmission = 0;
    if (form) {
        var status = form.querySelector('.form-status');
        var submit = form.querySelector('button[type="submit"]');
        var submitHtml = submit.innerHTML;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) { form.reportValidity(); return; }
            if (Date.now() - lastSubmission < 30000) {
                status.textContent = 'Merci de patienter 30 secondes avant un nouvel envoi.';
                return;
            }
            if (!window.emailjs) {
                status.textContent = '❌ Le service d\'envoi est indisponible. Écrivez-moi sur WhatsApp ou par email.';
                return;
            }
            submit.disabled = true;
            submit.textContent = 'Envoi en cours…';
            status.textContent = '';
            emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form, EMAILJS.userId)
                .then(function () {
                    status.textContent = '✅ Message envoyé ! Je vous réponds très vite.';
                    form.reset();
                    lastSubmission = Date.now();
                })
                .catch(function (error) {
                    console.error('Erreur EmailJS:', error);
                    var reason = error && error.status === 429 ? 'Trop de tentatives, réessayez plus tard.' : 'Problème de connexion.';
                    status.textContent = '❌ ' + reason + ' Vous pouvez aussi m\'écrire sur WhatsApp.';
                })
                .then(function () {
                    submit.disabled = false;
                    submit.innerHTML = submitHtml;
                });
        });
    }
})();
