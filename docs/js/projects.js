/* projects.js — single source of project data for the terminal.
   The data is read from the existing project cards, so nothing is duplicated. */

(function () {
    "use strict";

    function readProjects() {
        var links = document.querySelectorAll("#projects article > a");

        return Array.prototype.map.call(links, function (link) {
            var name = link.querySelector("h3");
            var tech = link.querySelector("p");

            return {
                name: name ? name.textContent.trim() : "",
                technologies: tech ? tech.textContent.trim() : "",
                github: link.href
            };
        });
    }

    window.Portfolio = window.Portfolio || {};
    window.Portfolio.getProjects = readProjects;
})();
