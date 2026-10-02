/* i18n.js — English default, Persian secondary language. */

(function () {
    "use strict";

    var STORAGE_KEY = "amirali-language";

    var translations = {
        en: {
            nav: {
                home: "Home",
                about: "About",
                projects: "Projects",
                skills: "Skills",
                blog: "Blog",
                contact: "Contact"
            },

            hero: {
                greeting: "Hi, I'm",
                role: "Junior Backend Developer",
                tech: "Python · FastAPI · Linux · Networking",
                description:
                    "Backend developer interested in Linux systems, networking and software engineering.",
                projects: "View Projects",
                cv: "Download CV"
            },

            terminal: {
                label: "Interactive terminal",
                prompt: "amirali@portfolio:~$",
                placeholder: "help"
            },

            about: {
                title: "About Me",
                text1:
                    "I'm a Junior Backend Developer focused on Backend Development, Python programming, Linux systems and Networking.",
                text2:
                    "Alongside my studies, I work on practical projects and explore API design, software architecture, databases and software infrastructure.",
                education: "Education",
                degree: "B.Sc. Computer Engineering",
                university: "Islamic Azad University, Qom Branch",
                student: "Third-semester Computer Engineering student"
            },

            projects: {
                title: "Projects",
                subtitle: "Some of the things I've built.",
                anonymous: {
                    aria: "View Anonymous Messaging Platform on GitHub"
                },
                sourceslist: {
                    aria: "View SourcesList on GitHub"
                },
                telegram: {
                    aria: "View Telegram Reminder Bot on GitHub"
                }
            },

            skills: {
                title: "Skills"
            },

            interests: {
                title: "Areas of Interest"
            },

            blog: {
                title: "Technical Blog",
                description:
                    "Notes, experiences and articles about Backend, Linux, Networking and Software Development.",
                coming: "Technical posts coming soon",
                text:
                    "Technical notes and experiences will be published here.",
                button: "View Blog"
            },

            contact: {
                title: "Contact Me",
                email: "Email"
            },

            footer: {
                copyright: "© 2026 Amirali. All rights reserved.",
                built: "Built with HTML, CSS & JavaScript."
            },

            theme: {
                light: "Enable light mode",
                dark: "Enable dark mode"
            },

            language: {
                switch: "فارسی"
            }
        },

        fa: {
            nav: {
                home: "صفحه اصلی",
                about: "درباره من",
                projects: "پروژه‌ها",
                skills: "مهارت‌ها",
                blog: "وبلاگ",
                contact: "تماس"
            },

            hero: {
                greeting: "سلام، من",
                role: "توسعه‌دهنده Junior Backend",
                tech: "Python · FastAPI · Linux · Networking",
                description:
                    "توسعه‌دهنده بک‌اند و علاقه‌مند به سیستم‌های لینوکس، شبکه و مهندسی نرم‌افزار.",
                projects: "مشاهده پروژه‌ها",
                cv: "دانلود رزومه"
            },

            terminal: {
                label: "ترمینال تعاملی",
                prompt: "amirali@portfolio:~$",
                placeholder: "help"
            },

            about: {
                title: "درباره من",
                text1:
                    "من یک Junior Backend Developer هستم که تمرکز اصلی‌ام روی توسعه Backend، برنامه‌نویسی Python، سیستم‌های Linux و Networking است.",
                text2:
                    "در کنار تحصیل، روی پروژه‌های عملی کار می‌کنم و به طراحی API، معماری نرم‌افزار، پایگاه داده و زیرساخت نرم‌افزاری علاقه‌مندم.",
                education: "تحصیلات",
                degree: "کارشناسی مهندسی کامپیوتر",
                university: "دانشگاه آزاد اسلامی واحد قم",
                student: "دانشجوی ترم سوم مهندسی کامپیوتر"
            },

            projects: {
                title: "پروژه‌ها",
                subtitle: "بخشی از پروژه‌هایی که ساخته‌ام.",
                anonymous: {
                    aria: "مشاهده پروژه Anonymous Messaging Platform در GitHub"
                },
                sourceslist: {
                    aria: "مشاهده پروژه SourcesList در GitHub"
                },
                telegram: {
                    aria: "مشاهده پروژه Telegram Reminder Bot در GitHub"
                }
            },

            skills: {
                title: "مهارت‌ها"
            },

            interests: {
                title: "زمینه‌های مورد علاقه"
            },

            blog: {
                title: "وبلاگ فنی",
                description:
                    "یادداشت‌ها، تجربه‌ها و مطالبی درباره Backend، Linux، Networking و Software Development.",
                coming: "مطالب فنی به‌زودی",
                text:
                    "در این بخش مطالب و تجربیات فنی منتشر خواهند شد.",
                button: "مشاهده وبلاگ"
            },

            contact: {
                title: "ارتباط با من",
                email: "ایمیل"
            },

            footer: {
                copyright: "© 2026 Amirali. تمامی حقوق محفوظ است.",
                built: "ساخته شده با HTML، CSS و JavaScript."
            },

            theme: {
                light: "فعال‌سازی حالت روشن",
                dark: "فعال‌سازی حالت تاریک"
            },

            language: {
                switch: "English"
            }
        }
    };

    var currentLanguage = "en";

    function getValue(object, path) {
        var parts = path.split(".");
        var value = object;

        parts.forEach(function (part) {
            if (value && Object.prototype.hasOwnProperty.call(value, part)) {
                value = value[part];
            } else {
                value = null;
            }
        });

        return value;
    }

    function getStoredLanguage() {
        try {
            var value = window.localStorage.getItem(STORAGE_KEY);

            if (value === "en" || value === "fa") {
                return value;
            }
        } catch (error) {
            /* Storage unavailable. */
        }

        return "en";
    }

    function saveLanguage(language) {
        try {
            window.localStorage.setItem(STORAGE_KEY, language);
        } catch (error) {
            /* Storage unavailable. */
        }
    }

    function applyTranslations(language) {
        var dictionary = translations[language];

        document.documentElement.lang = language;
        document.documentElement.dir = language === "fa" ? "rtl" : "ltr";

        document.title =
            language === "en"
                ? "Amirali | Junior Backend Developer"
                : "Amirali | Junior Backend Developer";

        document.querySelectorAll("[data-i18n]").forEach(function (element) {
            var key = element.getAttribute("data-i18n");
            var value = getValue(dictionary, key);

            if (value !== null) {
                element.textContent = value;
            }
        });

        document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
            var key = element.getAttribute("data-i18n-aria");
            var value = getValue(dictionary, key);

            if (value !== null) {
                element.setAttribute("aria-label", value);
            }
        });

        document.querySelectorAll("[data-i18n-title]").forEach(function (element) {
            var key = element.getAttribute("data-i18n-title");
            var value = getValue(dictionary, key);

            if (value !== null) {
                element.setAttribute("title", value);
            }
        });

        document
            .querySelectorAll("[data-i18n-placeholder]")
            .forEach(function (element) {
                var key = element.getAttribute("data-i18n-placeholder");
                var value = getValue(dictionary, key);

                if (value !== null) {
                    element.setAttribute("placeholder", value);
                }
            });

        var languageLabel = document.getElementById("language-label");

        if (languageLabel) {
            languageLabel.textContent = dictionary.language.switch;
        }

        window.dispatchEvent(
            new CustomEvent("languagechange", {
                detail: {
                    language: language
                }
            })
        );
    }

    function setLanguage(language) {
        if (language !== "en" && language !== "fa") {
            return;
        }

        currentLanguage = language;
        saveLanguage(language);
        applyTranslations(language);

        if (window.Portfolio && window.Portfolio.updateHeroTyping) {
            window.Portfolio.updateHeroTyping();
        }
    }

    function toggleLanguage() {
        setLanguage(currentLanguage === "en" ? "fa" : "en");
    }

    function init() {
        var button = document.getElementById("language-toggle");

        currentLanguage = getStoredLanguage();
        applyTranslations(currentLanguage);

        if (button) {
            button.addEventListener("click", toggleLanguage);
        }
    }

    window.Portfolio = window.Portfolio || {};

    window.PortfolioI18n = {
        getLanguage: function () {
            return currentLanguage;
        },

        get: function (path) {
            return getValue(translations[currentLanguage], path);
        },

        setLanguage: setLanguage,

        getDictionary: function () {
            return translations[currentLanguage];
        }
    };

    window.Portfolio.updateLanguage = setLanguage;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();