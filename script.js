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
                smoothScroll(url);
            } else {
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
});