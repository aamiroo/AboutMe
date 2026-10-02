/* terminal.js — safe portfolio terminal. */

(function () {
    "use strict";

    var PROMPT = "amirali@portfolio:~$";

    var output = null;
    var form = null;
    var input = null;
    var history = [];
    var historyIndex = 0;

    var HELP = [
        ["help", "show this list"],
        ["whoami", "who I am"],
        ["skills", "technologies I work with"],
        ["projects", "selected projects on GitHub"],
        ["contact", "how to reach me"],
        ["clear", "clear the terminal"]
    ];

    function appendLine(className) {
        var line = document.createElement("p");

        line.className =
            "terminal__line" +
            (className ? " " + className : "");

        output.appendChild(line);

        return line;
    }

    function scrollToEnd() {
        output.scrollTop = output.scrollHeight;
    }

    function print(text, className) {
        var line = appendLine(className);

        line.textContent = text;

        scrollToEnd();

        return line;
    }

    function printBlank() {
        appendLine("terminal__line--blank");
        scrollToEnd();
    }

    function printCommand(command) {
        var line = appendLine("terminal__line--new");

        var prompt = document.createElement("span");

        prompt.className = "terminal__prompt";
        prompt.textContent = PROMPT;

        line.appendChild(prompt);
        line.appendChild(
            document.createTextNode(" " + command)
        );

        scrollToEnd();
    }

    function makeLink(label, href) {
        var link = document.createElement("a");

        link.href = href;
        link.textContent = label;

        if (/^https?:/i.test(href)) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }

        return link;
    }

    function printLink(label, href) {
        var line = appendLine();

        line.appendChild(
            makeLink(label, href)
        );

        scrollToEnd();
    }

    function printLabelled(label, value, href) {
        var line = appendLine();

        var prefix = document.createElement("span");

        prefix.className =
            "terminal__line--muted";

        prefix.textContent =
            label + " ";

        line.appendChild(prefix);

        line.appendChild(
            href
                ? makeLink(value, href)
                : document.createTextNode(value)
        );

        scrollToEnd();
    }

    function pad(text, size) {
        while (text.length < size) {
            text += " ";
        }

        return text;
    }


    /* ----- commands ------------------------------------------------------ */

    function commandHelp() {
        var fa =
            window.PortfolioI18n &&
            window.PortfolioI18n.getLanguage() === "fa";

        print(
            fa
                ? "دستورات موجود:"
                : "Available commands:",
            "terminal__line--muted"
        );

        HELP.forEach(function (entry) {
            print(
                "  " +
                pad(entry[0], 11) +
                (
                    fa
                        ? {
                            help: "نمایش این لیست",
                            whoami: "درباره من",
                            skills: "مهارت‌ها و تکنولوژی‌ها",
                            projects: "پروژه‌های GitHub",
                            contact: "راه‌های ارتباطی",
                            clear: "پاک کردن ترمینال"
                        }[entry[0]]
                        : entry[1]
                )
            );
        });
    }

    function commandWhoami() {
        var fa =
            window.PortfolioI18n &&
            window.PortfolioI18n.getLanguage() === "fa";

        print(
            fa
                ? "توسعه‌دهنده Junior Backend"
                : "Junior Backend Developer"
        );

        print(
            "Python · FastAPI · Linux · Networking",
            "terminal__line--muted"
        );
    }

    function commandSkills() {
        var groups =
            document.querySelectorAll(
                "#skills .skills__grid article"
            );

        if (!groups.length) {
            print(
                "Skills are listed on this site.",
                "terminal__line--muted"
            );

            return;
        }

        Array.prototype.forEach.call(
            groups,
            function (group) {
                var title =
                    group.querySelector("h3");

                var items =
                    group.querySelectorAll("li");

                var values =
                    Array.prototype.map.call(
                        items,
                        function (item) {
                            return item.textContent.trim();
                        }
                    );

                if (!title || !values.length) {
                    return;
                }

                printLabelled(
                    title.textContent.trim() + ":",
                    values.join(", ")
                );
            }
        );
    }

    function commandProjects() {
        var projects =
            window.Portfolio &&
            window.Portfolio.getProjects
                ? window.Portfolio.getProjects()
                : [];

        if (!projects.length) {
            print(
                "No projects found.",
                "terminal__line--muted"
            );

            return;
        }

        projects.forEach(
            function (project, index) {
                print(
                    index + 1 +
                    ". " +
                    project.name
                );

                if (project.technologies) {
                    print(
                        "   " +
                        project.technologies,
                        "terminal__line--muted"
                    );
                }

                if (project.github) {
                    printLink(
                        project.github,
                        project.github
                    );
                }
            }
        );
    }

    function commandContact() {
        var rows =
            document.querySelectorAll(
                "#contact address p"
            );

        if (!rows.length) {
            print(
                "Contact details are listed on this site.",
                "terminal__line--muted"
            );

            return;
        }

        Array.prototype.forEach.call(
            rows,
            function (row) {
                var link =
                    row.querySelector("a");

                var label =
                    link
                        ? link.getAttribute("aria-label")
                        : "Location";

                var value =
                    link
                        ? link.textContent.trim()
                        : "Qom, Iran";

                if (link) {
                    printLabelled(
                        label + ":",
                        value,
                        link.href
                    );
                } else {
                    printLabelled(
                        label + ":",
                        value
                    );
                }
            }
        );
    }

    function commandClear() {
        while (output.firstChild) {
            output.removeChild(
                output.firstChild
            );
        }
    }

    var commands = {
        help: commandHelp,
        whoami: commandWhoami,
        skills: commandSkills,
        projects: commandProjects,
        contact: commandContact,
        clear: commandClear
    };


    /* ----- input handling ------------------------------------------------ */

    function run(raw) {
        var value = raw.trim();

        if (!value) {
            return;
        }

        history.push(value);
        historyIndex = history.length;

        printCommand(value);

        var name =
            value
                .split(/\s+/)[0]
                .toLowerCase();

        var handler =
            commands[name];

        if (handler) {
            handler();
        } else {
            var fa =
                window.PortfolioI18n &&
                window.PortfolioI18n.getLanguage() === "fa";

            print(
                (fa
                    ? "دستور پیدا نشد: "
                    : "command not found: ") +
                name,
                "terminal__line--error"
            );

            print(
                fa
                    ? "برای مشاهده دستورات 'help' را وارد کنید."
                    : "Type 'help' for a list of commands.",
                "terminal__line--muted"
            );
        }

        printBlank();
    }

    function submit() {
        var value = input.value;

        input.value = "";

        run(value);
    }

    function onSubmit(event) {
        event.preventDefault();
        submit();
    }

    function moveCaretToEnd() {
        input.setSelectionRange(
            input.value.length,
            input.value.length
        );
    }

    function onKeydown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submit();
            return;
        }

        if (!history.length) {
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            historyIndex =
                Math.max(
                    0,
                    historyIndex - 1
                );

            input.value =
                history[historyIndex];

            moveCaretToEnd();

        } else if (event.key === "ArrowDown") {

            event.preventDefault();

            historyIndex =
                Math.min(
                    history.length,
                    historyIndex + 1
                );

            input.value =
                history[historyIndex] || "";
        }
    }

    function onTerminalClick(event) {
        var selection =
            window.getSelection
                ? String(window.getSelection())
                : "";

        if (
            event.target.closest &&
            event.target.closest("a")
        ) {
            return;
        }

        if (selection.length > 0) {
            return;
        }

        input.focus();
    }


    /* ----- setup --------------------------------------------------------- */

    function init() {
        output =
            document.getElementById(
                "terminal-output"
            );

        form =
            document.getElementById(
                "terminal-form"
            );

        input =
            document.getElementById(
                "terminal-input"
            );

        if (!output || !form || !input) {
            return;
        }

        form.addEventListener(
            "submit",
            onSubmit
        );

        input.addEventListener(
            "keydown",
            onKeydown
        );

        output.parentNode.addEventListener(
            "click",
            onTerminalClick
        );
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    } else {
        init();
    }
})();