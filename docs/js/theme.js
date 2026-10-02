/* theme.js — saved/system theme and theme toggle. */

(function () {
    "use strict";

    var STORAGE_KEY = "amirali-theme";
    var root = document.documentElement;
    var current = "dark";

    function systemTheme() {
        if (!window.matchMedia) {
            return "dark";
        }

        return window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
    }

    function storedTheme() {
        try {
            var value = window.localStorage.getItem(STORAGE_KEY);

            return value === "light" || value === "dark"
                ? value
                : null;
        } catch (error) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            /* Storage unavailable. */
        }
    }

    function applyTheme(theme) {
        current = theme;
        root.setAttribute("data-theme", theme);
    }

    function updateLabel() {
        var button = document.getElementById("theme-toggle");

        if (!button) {
            return;
        }

        var language = root.lang || "en";

        var label;

        if (language === "fa") {
            label =
                current === "dark"
                    ? "فعال‌سازی حالت روشن"
                    : "فعال‌سازی حالت تاریک";
        } else {
            label =
                current === "dark"
                    ? "Enable light mode"
                    : "Enable dark mode";
        }

        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
    }

    function toggleTheme() {
        applyTheme(
            current === "dark"
                ? "light"
                : "dark"
        );

        saveTheme(current);
        updateLabel();
    }

    function watchSystemPreference() {
        if (!window.matchMedia) {
            return;
        }

        var query = window.matchMedia(
            "(prefers-color-scheme: light)"
        );

        function onChange(event) {
            if (storedTheme()) {
                return;
            }

            applyTheme(
                event.matches
                    ? "light"
                    : "dark"
            );

            updateLabel();
        }

        if (query.addEventListener) {
            query.addEventListener("change", onChange);
        } else if (query.addListener) {
            query.addListener("change", onChange);
        }
    }

    function init() {
        var button = document.getElementById("theme-toggle");

        updateLabel();
        watchSystemPreference();

        if (button) {
            button.addEventListener("click", toggleTheme);
        }

        window.addEventListener(
            "languagechange",
            updateLabel
        );
    }

    applyTheme(
        storedTheme() || systemTheme()
    );

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    } else {
        init();
    }
})();