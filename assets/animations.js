/*
 * Animations du portfolio, construites avec les recettes de motion design HyperFrames
 * (waterfall entry, counting, gradient text sweep, clip-path wipe, path draw,
 * parallax, spotlight) et les pratiques des portfolios primés (Awwwards, Codrops) :
 * un mouvement sobre et intentionnel, qui guide le regard vers ce qui fait vendre.
 * Si le visiteur demande à réduire les animations, seule la barre de progression reste.
 */
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var EASE = 'power3.out';

    // 1. Barre de progression de lecture
    var progress = document.querySelector('.scroll-progress');
    if (progress) {
        gsap.to(progress, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
    }

    // 2. Halo lumineux qui suit la souris sur les cartes ("spotlight")
    if (canHover) {
        document.addEventListener('pointermove', function (e) {
            var card = e.target.closest && e.target.closest('.spotlight');
            if (!card) return;
            var r = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        }, { passive: true });
    }

    if (reduceMotion) return;
    document.documentElement.classList.add('motion-ok');

    // Découpe un titre en mots masqués pour un révélé net, mot à mot
    function splitWords(el) {
        if (!el || el.dataset.split) return [];
        el.dataset.split = '1';
        var words = [];
        (function walk(node) {
            Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                if (child.nodeType === 3) {
                    var frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(function (part) {
                        if (!part) return;
                        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
                        var outer = document.createElement('span');
                        outer.className = 'w';
                        var inner = document.createElement('span');
                        inner.className = 'wi';
                        inner.textContent = part;
                        outer.appendChild(inner);
                        frag.appendChild(outer);
                        words.push(inner);
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === 1 && child.tagName !== 'BR') {
                    walk(child);
                }
            });
        })(el);
        return words;
    }

    // Compteur (recette "counting") qui conserve le suffixe : "4+", "9"
    function countUp(el, delay) {
        var match = el.textContent.trim().match(/^(\d+)(.*)$/);
        if (!match) return;
        var target = parseInt(match[1], 10);
        var suffix = match[2];
        var state = { v: 0 };
        el.textContent = '0' + suffix;
        gsap.to(state, {
            v: target, duration: 1.6, delay: delay || 0, ease: 'power2.out',
            onUpdate: function () { el.textContent = Math.round(state.v) + suffix; },
            onComplete: function () { el.textContent = target + suffix; }
        });
    }

    // 3. Entrée du hero : une seule timeline chorégraphiée
    var heroWords = splitWords(document.querySelector('.hero-title'));
    var hero = gsap.timeline({ defaults: { ease: EASE }, delay: 0.1 });
    hero
        .from('.hero-bg', { autoAlpha: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('.availability', { y: 14, autoAlpha: 0, duration: 0.6 }, 0.1)
        .from('.hero-eyebrow', { y: 14, autoAlpha: 0, duration: 0.6 }, 0.2)
        .from(heroWords, { yPercent: 115, duration: 1, stagger: 0.06, ease: 'power4.out' }, 0.3)
        .from('.hero-lead', { y: 20, autoAlpha: 0, duration: 0.8 }, 0.75)
        .from('.hero-ctas', { y: 20, autoAlpha: 0, duration: 0.7 }, 0.9)
        .from('.hero-proof', {
            y: 20, autoAlpha: 0, duration: 0.7,
            onStart: function () {
                document.querySelectorAll('.hero-proof .count').forEach(function (el, i) { countUp(el, i * 0.12); });
            }
        }, 1.05)
        .from('.stack .frame', {
            y: 120, rotationX: 22, autoAlpha: 0, duration: 1.4, stagger: 0.16,
            ease: 'expo.out', transformPerspective: 1400, transformOrigin: '50% 100%'
        }, 0.35)
        .from('.chip-float', { scale: 0.6, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, 1.1)
        .from('.scroll-cue', { autoAlpha: 0, duration: 0.6 }, 1.4);

    // Puces flottantes : légère oscillation continue (recette "sine wave loop")
    gsap.utils.toArray('.chip-float').forEach(function (chip, i) {
        gsap.to(chip, { y: i % 2 ? 8 : -8, duration: 2.4 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.8 });
    });

    // 4. Profondeur : parallaxe au défilement + inclinaison à la souris
    var stack = document.querySelector('.stack');
    if (stack) {
        [['.stack .f1', -14], ['.stack .f2', -4], ['.stack .f3', -26]].forEach(function (cfg) {
            gsap.to(cfg[0], {
                yPercent: cfg[1], ease: 'none',
                scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
            });
        });
        gsap.to('.hero-copy', {
            y: -50, autoAlpha: 0.35, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true }
        });
        if (canHover) {
            var rotY = gsap.quickTo(stack, 'rotationY', { duration: 0.9, ease: 'power3.out' });
            var rotX = gsap.quickTo(stack, 'rotationX', { duration: 0.9, ease: 'power3.out' });
            var heroEl = document.querySelector('.hero');
            heroEl.addEventListener('pointermove', function (e) {
                rotY((e.clientX / window.innerWidth - 0.5) * 10);
                rotX((e.clientY / window.innerHeight - 0.5) * -7);
            });
            heroEl.addEventListener('pointerleave', function () { rotX(0); rotY(0); });
        }
    }

    // Révélé robuste : tout élément arrivé dans l'écran OU déjà dépassé est animé une fois.
    // Fonctionne aussi après un rechargement en milieu de page, un lien #contact
    // ou la restauration du défilement par le navigateur.
    var pendingGroups = [];
    var ticking = false;
    function checkPending() {
        var limit = window.innerHeight * 0.88;
        pendingGroups.forEach(function (group) {
            var ready = group.items.filter(function (el) {
                return !el.dataset.revealed && el.getBoundingClientRect().top < limit;
            });
            if (ready.length) {
                ready.forEach(function (el) { el.dataset.revealed = '1'; });
                group.reveal(ready);
            }
        });
    }
    function onScrollCheck() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { ticking = false; checkPending(); });
    }
    window.addEventListener('scroll', onScrollCheck, { passive: true });
    window.addEventListener('resize', onScrollCheck);
    window.addEventListener('load', function () { setTimeout(checkPending, 50); });

    // Joue une timeline en pause quand l'élément devient visible
    function whenVisible(el, tl) {
        if (!el) return;
        pendingGroups.push({ items: [el], reveal: function () { tl.play(); } });
    }

    // 5. En-têtes de section : kicker, titre mot à mot, sous-titre
    gsap.utils.toArray('.section-title').forEach(function (title) {
        var scope = title.closest('.section-head, .about-copy, .contact-copy') || title.parentElement;
        var words = splitWords(title);
        var tl = gsap.timeline({ paused: true, defaults: { ease: EASE } });
        var kicker = scope.querySelector('.kicker');
        var sub = scope.querySelector('.section-sub');
        if (kicker) tl.from(kicker, { y: 12, autoAlpha: 0, duration: 0.5 });
        tl.from(words, { yPercent: 115, duration: 0.85, stagger: 0.035, ease: 'power4.out' }, kicker ? '-=0.25' : 0);
        if (sub) tl.from(sub, { y: 14, autoAlpha: 0, duration: 0.6 }, '-=0.5');
        whenVisible(title, tl);
    });

    // 6. Cartes en cascade (recette "waterfall entry")
    // Les transitions CSS de survol sont coupées pendant l'entrée pour ne pas freiner GSAP
    function waterfall(selector, opts) {
        var items = gsap.utils.toArray(selector);
        if (!items.length) return;
        opts = opts || {};
        gsap.set(items, { autoAlpha: 0, y: opts.y || 48, scale: opts.scale || 1, transition: 'none' });
        pendingGroups.push({
            items: items,
            reveal: function (batch) {
                gsap.to(batch, {
                    autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: EASE, overwrite: true,
                    onComplete: function () { gsap.set(batch, { clearProps: 'transition,transform,opacity,visibility' }); }
                });
            }
        });
    }
    waterfall('.feature-card', { y: 70 });
    waterfall('.filters', { y: 20 });
    waterfall('.project-card');
    waterfall('.bento-card', { scale: 0.96 });
    waterfall('.quote-card');
    waterfall('.journey-card', { y: 30 });
    waterfall('.contact-card', { y: 24 });
    waterfall('.contact-form', { y: 40 });
    waterfall('.skill-group, .about-ctas', { y: 20 });
    waterfall('.logos', { y: 0 });
    waterfall('.footer-cta, .footer-grid > *', { y: 30 });

    // Captures des projets à la une : dévoilement en volet (recette "clip-path wipe")
    gsap.utils.toArray('.feature-media .frame').forEach(function (frame) {
        var tl = gsap.timeline({ paused: true });
        tl.fromTo(frame,
            { clipPath: 'inset(0% 100% 0% 0% round 14px)' },
            {
                clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.3, ease: 'expo.inOut', delay: 0.15,
                onComplete: function () { gsap.set(frame, { clearProps: 'clipPath' }); }
            });
        whenVisible(frame, tl);
    });

    // 7. Méthode : la ligne se trace au défilement et allume chaque étape (recette "path draw")
    var fill = document.querySelector('.process-line-fill');
    var steps = gsap.utils.toArray('.step');
    if (steps.length) {
        whenVisible(document.querySelector('.process'),
            gsap.timeline({ paused: true }).from(steps, { y: 40, autoAlpha: 0, duration: 0.8, stagger: 0.15, ease: EASE }));
        if (fill && window.matchMedia('(min-width: 961px)').matches) {
            gsap.to(fill, {
                scaleX: 1, ease: 'none',
                scrollTrigger: {
                    trigger: '.process', start: 'top 70%', end: 'bottom 55%', scrub: 0.6,
                    onUpdate: function (self) {
                        steps.forEach(function (step, i) {
                            step.classList.toggle('is-active', self.progress >= i / (steps.length - 1) - 0.02);
                        });
                    }
                }
            });
        } else {
            steps.forEach(function (s) { s.classList.add('is-active'); });
        }
    }

    // 8. Portrait : dévoilement vertical + léger zoom arrière
    var photo = document.querySelector('.about-photo img');
    if (photo) {
        var photoTl = gsap.timeline({ paused: true });
        photoTl
            .fromTo(photo,
                { clipPath: 'inset(100% 0% 0% 0% round 23px)', scale: 1.12 },
                { clipPath: 'inset(0% 0% 0% 0% round 23px)', scale: 1, duration: 1.4, ease: 'expo.out' })
            .from('.photo-badge', { y: 20, autoAlpha: 0, duration: 0.6, ease: EASE }, 0.6);
        whenVisible(photo.parentElement, photoTl);
    }

    checkPending();

    // 9. Bouton principal "magnétique" (recette "nudge")
    if (canHover) {
        gsap.utils.toArray('.magnetic').forEach(function (btn) {
            var mx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
            var my = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
            btn.addEventListener('pointermove', function (e) {
                var r = btn.getBoundingClientRect();
                mx((e.clientX - r.left - r.width / 2) * 0.25);
                my((e.clientY - r.top - r.height / 2) * 0.35);
            });
            btn.addEventListener('pointerleave', function () { mx(0); my(0); });
        });
    }

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
