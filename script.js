document.addEventListener('DOMContentLoaded', () => {

    const smoothScroll = (targetId) => {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // 0. Bento Tiles
    const tiles = document.querySelectorAll('.bento-tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const url = tile.getAttribute('data-url');
            if (!url) return;

            if (url.startsWith('#')) {
                // Если это якорь (как в Other Projects), скроллим плавно
                smoothScroll(url);
            } else {
                // Если это ссылка, переходим
                window.location.href = url;
            }
        });
    });

    // 1. Bento Button Smooth Scrolling Logic
    const bentoButtons = document.querySelectorAll('.bento-btn');
    bentoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();

            const targetId = button.getAttribute('data-target');
            const externalUrl = button.getAttribute('data-url');

            if (targetId) {
                smoothScroll(targetId);
            } else if (externalUrl) {
                window.location.href = externalUrl;
            }
        });
    });

    // 2. Interactive Tech Tags Expansion Logic
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        const desc = item.querySelector('.tech-desc');

        // On Hover: Calculate the exact natural height and expand smoothly
        item.addEventListener('mouseenter', () => {
            // Temporarily set height to auto to get the real content height
            desc.style.height = 'auto';
            const height = desc.scrollHeight + 'px';

            // Reset to 0 so the transition can happen
            desc.style.height = '0px';

            // Force reflow
            desc.offsetHeight;

            // Apply expanded styles
            desc.style.height = height;
            desc.style.opacity = '1';
            desc.style.marginTop = '0.5rem';
        });

        // On Mouse Leave: Collapse back to 0
        item.addEventListener('mouseleave', () => {
            desc.style.height = '0px';
            desc.style.opacity = '0';
            desc.style.marginTop = '0px';
        });
    });
});