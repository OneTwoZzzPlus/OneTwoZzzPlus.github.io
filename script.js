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

    // 0. Bento Tiles
    const tiles = document.querySelectorAll(".bento-tile");
    tiles.forEach((tile) => {
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

    // 1. Bento Button Smooth Scrolling Logic
    const bentoButtons = document.querySelectorAll(".bento-btn");
    bentoButtons.forEach((button) => {
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

    // 2. Универсальный переключатель табов
    document.querySelectorAll(".project-tabs").forEach((tabsEl) => {
        const inputs = tabsEl.querySelectorAll('input[type="radio"]');
        const labels = tabsEl.querySelectorAll(".tab-btn");
        const contents = tabsEl.querySelectorAll(".tab-content");

        const getTabId = (el) => {
            for (const cls of el.classList) {
                const m = cls.match(/^(?:tab-input|tab-lbl|content)-(\d+)$/);
                if (m) return m[1];
            }
            return null;
        };

        const update = () => {
            const checked = Array.from(inputs).find((i) => i.checked);
            if (!checked) return;
            const activeId = getTabId(checked);

            labels.forEach((l) =>
                l.classList.toggle("active", getTabId(l) === activeId),
            );
            contents.forEach((c) =>
                c.classList.toggle("active", getTabId(c) === activeId),
            );
        };

        inputs.forEach((input) => input.addEventListener("change", update));

        update();
    });
});
