// ══════════════════════════════════
// Abu Dhabi Onboarding - Animations
// ══════════════════════════════════

(function () {
    'use strict';

    // ── Scroll Progress Bar ──
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });

    // ── Cursor Glow ──
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // ── Menu Card Mouse Glow ──
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // ── Page Transition ──
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http')) return;
            e.preventDefault();
            pageTransition.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // ── Scroll Reveal (Intersection Observer) ──
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ── Auto-add reveal classes to cards and menu cards ──
    function addRevealClasses() {
        // Menu cards get staggered reveal
        const menuGrid = document.querySelector('.menu-grid');
        if (menuGrid) {
            menuGrid.classList.add('stagger-children');
            menuGrid.querySelectorAll('.menu-card').forEach(card => {
                card.classList.add('reveal');
            });
        }

        // Detail page cards get staggered reveal
        const cardsGrid = document.querySelector('.cards-grid');
        if (cardsGrid) {
            cardsGrid.classList.add('stagger-children');
            cardsGrid.querySelectorAll('.card').forEach(card => {
                card.classList.add('reveal');
            });
        }

        // Tips box gets scale reveal
        document.querySelectorAll('.tips-box').forEach(box => {
            box.classList.add('reveal-scale');
        });

        // Footer gets reveal
        document.querySelectorAll('footer').forEach(f => {
            f.classList.add('reveal');
        });

        // Re-observe all newly added elements
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            if (!el.classList.contains('visible')) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -40px 0px'
                });
                observer.observe(el);
            }
        });
    }

    // ── Visit Button Ripple Effect ──
    document.querySelectorAll('.visit-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ── Tilt Effect on Cards (subtle 3D) ──
    document.querySelectorAll('.card, .menu-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── Counter Animation for menu-count ──
    function animateCounters() {
        document.querySelectorAll('.menu-count').forEach(counter => {
            const text = counter.textContent || counter.innerText;
            const match = text.match(/\d+/);
            if (!match) return;
            const target = parseInt(match[0]);
            const originalText = text;
            let current = 0;
            const duration = 1200;
            const stepTime = duration / target;

            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && current === 0) {
                        const interval = setInterval(() => {
                            current++;
                            counter.childNodes[0].textContent = originalText.replace(/\d+/, current);
                            if (current >= target) {
                                clearInterval(interval);
                                // Restore original HTML for i18n compatibility
                            }
                        }, stepTime);
                    }
                });
            }, { threshold: 0.5 });

            counterObserver.observe(counter);
        });
    }

    // ── Parallax on Hero ──
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < hero.offsetHeight) {
                const eyebrow = hero.querySelector('.hero-eyebrow');
                const title = hero.querySelector('h1');
                const subtitle = hero.querySelector('.hero-subtitle');
                if (eyebrow) eyebrow.style.transform = `translateY(${scrolled * 0.15}px)`;
                if (title) title.style.transform = `translateY(${scrolled * 0.25}px)`;
                if (subtitle) subtitle.style.transform = `translateY(${scrolled * 0.1}px)`;
                hero.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.4;
            }
        });
    }

    // ── Smooth Scroll ──
    document.documentElement.style.scrollBehavior = 'smooth';

    // ══════════════════════════════════
    // SPARKLE SYSTEMS
    // ══════════════════════════════════

    // ── 1. Canvas Background Sparkles ──
    function initSparkleCanvas() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.innerWidth < 768) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'sparkle-canvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        const sparkles = [];
        const sparkleCount = 40;
        const gold = [184, 150, 46];
        const goldLight = [212, 184, 90];

        for (let i = 0; i < sparkleCount; i++) {
            sparkles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5 + 1,
                speedY: Math.random() * 0.3 + 0.1,
                speedX: (Math.random() - 0.5) * 0.2,
                opacity: 0,
                maxOpacity: Math.random() * 0.5 + 0.3,
                phase: Math.random() * Math.PI * 2,
                color: Math.random() > 0.5 ? gold : goldLight
            });
        }

        function drawSparkle(s) {
            ctx.save();
            ctx.globalAlpha = s.opacity;
            ctx.fillStyle = `rgb(${s.color[0]}, ${s.color[1]}, ${s.color[2]})`;
            ctx.shadowColor = `rgba(${s.color[0]}, ${s.color[1]}, ${s.color[2]}, 0.6)`;
            ctx.shadowBlur = s.size * 3;

            // Draw 4-point star
            ctx.beginPath();
            const cx = s.x, cy = s.y, r = s.size;
            ctx.moveTo(cx, cy - r * 1.5);
            ctx.lineTo(cx + r * 0.4, cy - r * 0.4);
            ctx.lineTo(cx + r * 1.5, cy);
            ctx.lineTo(cx + r * 0.4, cy + r * 0.4);
            ctx.lineTo(cx, cy + r * 1.5);
            ctx.lineTo(cx - r * 0.4, cy + r * 0.4);
            ctx.lineTo(cx - r * 1.5, cy);
            ctx.lineTo(cx - r * 0.4, cy - r * 0.4);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        let frame = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            sparkles.forEach(s => {
                s.phase += 0.02;
                s.opacity = s.maxOpacity * (0.5 + 0.5 * Math.sin(s.phase));
                s.y -= s.speedY;
                s.x += s.speedX + Math.sin(frame * 0.005 + s.phase) * 0.15;

                if (s.y < -10) {
                    s.y = canvas.height + 10;
                    s.x = Math.random() * canvas.width;
                }

                drawSparkle(s);
            });

            requestAnimationFrame(animate);
        }
        animate();
    }

    // ── 2. Cursor Sparkle Trail ──
    function initSparkleTrail() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.innerWidth < 768) return;

        const trailCount = 8;
        const trails = [];

        for (let i = 0; i < trailCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'sparkle-trail';
            document.body.appendChild(dot);
            trails.push({ el: dot, x: 0, y: 0 });
        }

        let mouseX = 0, mouseY = 0;
        let lastSparkleTime = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrails() {
            const now = Date.now();

            trails.forEach((trail, i) => {
                const delay = (i + 1) * 3;
                trail.x += (mouseX - trail.x) / delay;
                trail.y += (mouseY - trail.y) / delay;

                const scale = 1 - (i / trailCount) * 0.6;
                const opacity = 0.6 - (i / trailCount) * 0.5;

                trail.el.style.left = trail.x + 'px';
                trail.el.style.top = trail.y + 'px';
                trail.el.style.opacity = opacity;
                trail.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
            });

            requestAnimationFrame(animateTrails);
        }
        animateTrails();
    }

    // ── 3. Glitter Overlay on Cards ──
    function addGlitterToCards() {
        document.querySelectorAll('.menu-card, .card').forEach(card => {
            const overlay = document.createElement('div');
            overlay.className = 'glitter-overlay';

            const count = 8;
            for (let i = 0; i < count; i++) {
                const g = document.createElement('span');
                g.className = 'glitter';
                g.style.left = Math.random() * 100 + '%';
                g.style.top = Math.random() * 100 + '%';
                g.style.setProperty('--dur', (Math.random() * 3 + 2) + 's');
                g.style.setProperty('--delay', (Math.random() * 3) + 's');
                g.style.width = (Math.random() * 3 + 2) + 'px';
                g.style.height = g.style.width;
                overlay.appendChild(g);
            }

            card.appendChild(overlay);
        });
    }

    // ── 4. Hover Sparkle Burst ──
    function addHoverSparkleBurst() {
        document.querySelectorAll('.menu-card, .card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                // Create burst of sparkles
                const rect = this.getBoundingClientRect();
                const burst = document.createElement('div');
                burst.className = 'sparkle-burst';

                for (let i = 0; i < 12; i++) {
                    const spark = document.createElement('span');
                    spark.className = 'spark';
                    const angle = (Math.PI * 2 / 12) * i;
                    const distance = Math.random() * 60 + 30;
                    const startX = rect.width / 2;
                    const startY = rect.height / 2;
                    const endX = startX + Math.cos(angle) * distance;
                    const endY = startY + Math.sin(angle) * distance;
                    const size = Math.random() * 3 + 2;

                    spark.style.width = size + 'px';
                    spark.style.height = size + 'px';
                    spark.style.left = startX + 'px';
                    spark.style.top = startY + 'px';
                    spark.style.transition = `all ${0.4 + Math.random() * 0.4}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

                    burst.appendChild(spark);

                    // Animate after appending
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            spark.style.left = endX + 'px';
                            spark.style.top = endY + 'px';
                            spark.style.opacity = '1';
                            setTimeout(() => {
                                spark.style.opacity = '0';
                                spark.style.transform = 'scale(0)';
                            }, 300);
                        });
                    });
                }

                this.appendChild(burst);
                setTimeout(() => burst.remove(), 1000);
            });
        });
    }

    // ── 5. Hero Extra Twinkle Stars ──
    function addHeroTwinkles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const star = document.createElement('span');
            star.className = 'glitter';
            star.style.position = 'absolute';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = (Math.random() * 3 + 1) + 'px';
            star.style.height = star.style.width;
            star.style.borderRadius = '50%';
            star.style.background = 'var(--gold-light)';
            star.style.boxShadow = '0 0 6px 2px rgba(212, 184, 90, 0.5)';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '1';
            star.style.animation = `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite`;

            hero.appendChild(star);
        }
    }

    // ── 6. Gold Dust on Tips Box ──
    function addTipsBoxSparkle() {
        document.querySelectorAll('.tips-box').forEach(box => {
            for (let i = 0; i < 10; i++) {
                const dust = document.createElement('span');
                dust.style.position = 'absolute';
                dust.style.left = Math.random() * 100 + '%';
                dust.style.top = Math.random() * 100 + '%';
                dust.style.width = (Math.random() * 3 + 1) + 'px';
                dust.style.height = dust.style.width;
                dust.style.borderRadius = '50%';
                dust.style.background = 'rgba(212, 184, 90, 0.4)';
                dust.style.boxShadow = '0 0 4px rgba(212, 184, 90, 0.3)';
                dust.style.pointerEvents = 'none';
                dust.style.zIndex = '1';
                dust.style.animation = `glitterShine ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite`;
                box.appendChild(dust);
            }
        });
    }

    // ══════════════════════════════════

    // ── Init ──
    function initAll() {
        addRevealClasses();
        animateCounters();
        initSparkleCanvas();
        initSparkleTrail();
        addGlitterToCards();
        addHoverSparkleBurst();
        addHeroTwinkles();
        addTipsBoxSparkle();
    }

    window.addEventListener('DOMContentLoaded', initAll);

    // If DOM already loaded
    if (document.readyState !== 'loading') {
        initAll();
    }

})();
