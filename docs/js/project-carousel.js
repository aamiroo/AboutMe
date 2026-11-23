/* Accessible horizontal project carousel. */
(function () {
    "use strict";
    var track = document.getElementById("projects-track");
    if (!track) return;
    var prev = document.querySelector(".project-nav--prev");
    var next = document.querySelector(".project-nav--next");
    function step() {
        var card = track.querySelector(".project-card");
        return card ? card.getBoundingClientRect().width + 18 : track.clientWidth * 0.8;
    }
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") { event.preventDefault(); track.scrollBy({ left: step(), behavior: "smooth" }); }
        if (event.key === "ArrowLeft") { event.preventDefault(); track.scrollBy({ left: -step(), behavior: "smooth" }); }
    });
})();
