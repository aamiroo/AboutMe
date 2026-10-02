/* main.js — navigation, scroll spy, reveal animations and hero typing. */

(function () {
    "use strict";

    /* ----- mobile navigation --------------------------------------------- */

    function initNav() {
        var toggle = document.getElementById("nav-toggle");
        var menu = document.getElementById("nav-menu");
        var media;

        if (!toggle || !menu) {
            return;
        }

        function isOpen() {
            return toggle.getAttribute("aria-expanded") === "true";
        }

        function setOpen(open) {
            menu.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        }

        toggle.addEventListener("click", function () {
            var open = !isOpen();

            setOpen(open);

            if (open) {
                var firstLink = menu.querySelector("a");

                if (firstLink) {
                    firstLink.focus();
                }
            }
        });

        menu.addEventListener("click", function (event) {
            if (event.target.closest("a")) {
                setOpen(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && isOpen()) {
                setOpen(false);
                toggle.focus();
            }
        });

        document.addEventListener("click", function (event) {
            if (
                isOpen() &&
                event.target.closest &&
                !event.target.closest("header")
            ) {
                setOpen(false);
            }
        });

        if (window.matchMedia) {
            media = window.matchMedia("(min-width: 861px)");

            function onChange(event) {
                if (event.matches) {
                    setOpen(false);
                }
            }

            if (media.addEventListener) {
                media.addEventListener("change", onChange);
            } else if (media.addListener) {
                media.addListener("change", onChange);
            }
        }
    }


    /* ----- scroll spy ----------------------------------------------------- */

    function initScrollSpy() {
        var links;
        var ids = [];
        var ticking = false;

        links = Array.prototype.slice.call(
            document.querySelectorAll('#nav-menu a[href^="#"]')
        );

        links.forEach(function (link) {
            var id = link.getAttribute("href").slice(1);

            if (id && document.getElementById(id)) {
                ids.push(id);
            }
        });

        if (!ids.length) {
            return;
        }

        function setActive(id) {
            links.forEach(function (link) {
                var active =
                    !!id &&
                    link.getAttribute("href") === "#" + id;

                link.classList.toggle("is-active", active);

                if (active) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }

        function update() {
            var root = document.documentElement;
            var line;
            var current = null;

            if (
                window.innerHeight + window.scrollY >=
                root.scrollHeight - 8
            ) {
                current = ids[ids.length - 1];
            } else {
                line = window.innerHeight * 0.45;

                ids.forEach(function (id) {
                    var element = document.getElementById(id);

                    if (
                        element &&
                        element.getBoundingClientRect().top <= line
                    ) {
                        current = id;
                    }
                });
            }

            setActive(current);
        }

        function requestUpdate() {
            if (ticking) {
                return;
            }

            ticking = true;

            window.requestAnimationFrame(function () {
                update();
                ticking = false;
            });
        }

        window.addEventListener("scroll", requestUpdate, {
            passive: true
        });

        window.addEventListener("resize", requestUpdate);

        update();
    }


    /* ----- scroll reveal -------------------------------------------------- */

    function initReveal() {
        var targets = [];
        var viewportHeight;
        var belowFold;

        if (!("IntersectionObserver" in window)) {
            return;
        }

        if (
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        Array.prototype.forEach.call(
            document.querySelectorAll("main > section"),
            function (section) {
                Array.prototype.forEach.call(
                    section.children,
                    function (child) {
                        targets.push(child);
                    }
                );
            }
        );

        viewportHeight = window.innerHeight;

        belowFold = targets.filter(function (element) {
            return (
                element.getBoundingClientRect().top >
                viewportHeight * 0.9
            );
        });

        if (!belowFold.length) {
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -5% 0px"
            }
        );

        belowFold.forEach(function (element) {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }


    /* ----- hero typing --------------------------------------------------- */

    var typingTimer = null;

    function initHeroTyping() {
        var element = document.getElementById("hero-tech-text");

        if (!element) {
            return;
        }

        if (typingTimer) {
            clearTimeout(typingTimer);
        }

        var text =
            window.PortfolioI18n &&
            window.PortfolioI18n.get("hero.tech")
                ? window.PortfolioI18n.get("hero.tech")
                : "Python · FastAPI · Linux · Networking";

        var index = 0;

        element.textContent = "";

        function type() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;

                typingTimer = setTimeout(type, 50);
            }
        }

        type();
    }


    /* ----- setup ---------------------------------------------------------- */

    function init() {
        initNav();
        initScrollSpy();
        initReveal();
        initHeroTyping();

        window.Portfolio = window.Portfolio || {};

        window.Portfolio.updateHeroTyping = initHeroTyping;

        window.addEventListener("languagechange", function () {
            initHeroTyping();
        });
    }


    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();