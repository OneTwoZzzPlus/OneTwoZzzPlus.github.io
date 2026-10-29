document.addEventListener("DOMContentLoaded", () => {
    const smoothScroll = (targetId) => {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // 0. Bento-плитки
    document.querySelectorAll(".bento-tile").forEach((tile) => {
        tile.addEventListener("click", () => {
            const url = tile.getAttribute("data-url");
            if (!url) return;

            if (url.startsWith("#")) {
                smoothScroll(url);
            } else {
                window.location.href = url;
            }
        });
    });

    // 1. Кнопки внутри bento-плиток
    document.querySelectorAll(".bento-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            const targetId = button.getAttribute("data-target");
            const externalUrl = button.getAttribute("data-url");

            if (targetId) {
                smoothScroll(targetId);
            } else if (externalUrl) {
                window.location.href = externalUrl;
            }
        });
    });

    // 2. Скрытие bento-кнопок, которые не помещаются в строку.
    // Прячем кнопки с конца, пока ряд не перестанет переполняться.
    const fitBentoButtons = () => {
        document.querySelectorAll(".tile-btns").forEach((group) => {
            const buttons = [...group.children];
            buttons.forEach((btn) => (btn.hidden = false));

            for (
                let i = buttons.length - 1;
                i >= 0 && group.scrollWidth > group.clientWidth;
                i--
            ) {
                buttons[i].hidden = true;
            }
        });
    };

    let resizeFrame = null;
    window.addEventListener("resize", () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(fitBentoButtons);
    });

    fitBentoButtons();
    // Шрифт Inter может загрузиться позже и поменять ширину кнопок
    document.fonts.ready.then(fitBentoButtons);

    // 3. Вкладки в карточках проектов
    const initTabs = (tabsEl) => {
        const buttons = [...tabsEl.querySelectorAll(".tab-btn")];
        const panels = [...tabsEl.querySelectorAll(".tab-content")];
        if (!buttons.length) return;

        const activate = (id) => {
            buttons.forEach((btn) => {
                const isActive = btn.dataset.tab === id;
                btn.classList.toggle("active", isActive);
                btn.setAttribute("aria-pressed", String(isActive));
            });
            panels.forEach((panel) => {
                panel.hidden = panel.dataset.tab !== id;
            });
        };

        buttons.forEach((btn) => {
            btn.addEventListener("click", () => activate(btn.dataset.tab));
            btn.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(btn.dataset.tab);
                }
            });
        });

        // Начальная вкладка: та, что помечена .active в HTML, иначе первая
        const initial =
            buttons.find((btn) => btn.classList.contains("active")) ||
            buttons[0];
        activate(initial.dataset.tab);
    };

    document.querySelectorAll(".project-tabs").forEach(initTabs);
});
