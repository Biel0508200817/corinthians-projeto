"use strict";


/* =========================================
   DOM
========================================= */

const loader = document.getElementById("loader");
const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 700);

});


/* =========================================
   HEADER SCROLL
========================================= */

let lastScroll = 0;

window.addEventListener(
    "scroll",
    () => {

        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        lastScroll = currentScroll;

    },
    { passive: true }
);


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    const isOpen = nav.classList.toggle("open");

    menuButton.classList.toggle("active", isOpen);

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );
}


menuButton.addEventListener("click", toggleMenu);


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (nav.classList.contains("open")) {
            toggleMenu();
        }

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   COUNTERS
========================================= */

const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.6
    }
);


counters.forEach(counter => {
    counterObserver.observe(counter);
});


function animateCounter(element) {

    const target = Number(element.dataset.target);

    const duration = 1600;

    const startTime = performance.now();

    function update(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        /*
         * Ease Out Quart
         */
        const eased =
            1 - Math.pow(1 - progress, 4);

        const currentValue =
            Math.floor(target * eased);

        element.textContent =
            currentValue.toLocaleString("pt-BR");

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent =
                target.toLocaleString("pt-BR");
        }

    }

    requestAnimationFrame(update);
}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const currentId =
                entry.target.getAttribute("id");

            navLinks.forEach(link => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (href === `#${currentId}`) {
                    link.classList.add("active");
                }

            });

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================
   SMOOTH CURSOR EFFECT
========================================= */

const cards = document.querySelectorAll(
    ".title-card, .identity-card"
);

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================
   PARALLAX HERO
========================================= */

const heroBackground =
    document.querySelector(".hero-background");

window.addEventListener(
    "scroll",
    () => {

        if (!heroBackground) {
            return;
        }

        const scroll =
            window.scrollY;

        if (scroll < window.innerHeight) {

            heroBackground.style.transform =
                `translateY(${scroll * 0.12}px) scale(1.05)`;

        }

    },
    { passive: true }
);


/* =========================================
   KEYBOARD ACCESSIBILITY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            nav.classList.contains("open")
        ) {
            toggleMenu();
        }

    }
);