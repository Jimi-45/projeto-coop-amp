document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Barra de Pesquisa
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const termo = searchInput.value.trim();
            if (termo) {
                alert('Buscando por: ' + termo);
            }
        });
    }

    // 3. Carrossel de 4 Slides (Por Sobreposição)
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const heroCarousel = document.getElementById('heroCarousel');

    if (slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentIndex);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-slide'), 10);
                if (!isNaN(index)) {
                    currentIndex = index;
                    showSlide(currentIndex);
                }
            });
        });

        // Troca automática a cada 5 segundos
        let interval = setInterval(nextSlide, 5000);

        // Pausa quando o mouse passa por cima
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', () => clearInterval(interval));
            heroCarousel.addEventListener('mouseleave', () => {
                interval = setInterval(nextSlide, 5000);
            });
        }
    }
});
