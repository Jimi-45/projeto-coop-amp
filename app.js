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

// SECAO QUEM SOMOS

  (function () {
    var valores = document.querySelectorAll(".qs__valor");
    if (!valores.length) return;

    var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzirMovimento || !("IntersectionObserver" in window)) return;

    function formatar(el, numero) {
      var prefixo = el.dataset.prefixo || "";
      var sufixo = el.dataset.sufixo || "";
      el.textContent = prefixo + Math.round(numero).toLocaleString("pt-BR") + sufixo;
    }

    function animar(el) {
      var alvo = Number(el.dataset.alvo);
      var duracao = 1600;
      var inicio = null;

      function passo(agora) {
        if (inicio === null) inicio = agora;
        var progresso = Math.min((agora - inicio) / duracao, 1);
        var suave = 1 - Math.pow(1 - progresso, 3);
        formatar(el, alvo * suave);
        if (progresso < 1) requestAnimationFrame(passo);
      }

      formatar(el, 0);
      requestAnimationFrame(passo);
    }

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          animar(entrada.target);
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.4 });

    valores.forEach(function (el) { observador.observe(el); });
  })();

// SEÇÃO SAIBA MAIS

/* 1) Abrir e fechar com animação suave */
(function () {
    var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.sm-item').forEach(function (item) {
        var resumo = item.querySelector('summary');
        var conteudo = item.querySelector('.sm-conteudo');
        var animacao = null;

        function terminar(abrir) {
            item.open = abrir;
            item.style.height = '';
            item.style.overflow = '';
            animacao = null;
        }

        resumo.addEventListener('click', function (e) {
            e.preventDefault();
            if (reduzir) { item.open = !item.open; return; }
            if (animacao) animacao.cancel();

            var alturaInicial = item.offsetHeight;
            var abrir = !item.open;
            item.style.overflow = 'hidden';

            if (abrir) item.open = true;

            var alturaFinal = abrir
                ? resumo.offsetHeight + conteudo.offsetHeight
                : resumo.offsetHeight;

            animacao = item.animate(
                { height: [alturaInicial + 'px', alturaFinal + 'px'] },
                { duration: 350, easing: 'ease-in-out' }
            );
            animacao.onfinish = function () { terminar(abrir); };
            animacao.oncancel = function () { animacao = null; };
        });
    });
})();

//SEÇÃO NOSSA MISSÃO

/* 2) Entrada dos elementos ao rolar a página */
(function () {
    var alvos = document.querySelectorAll('.saiba-mais h2, .saiba-mais__intro, .sm-item');
    if (!('IntersectionObserver' in window)) {
        alvos.forEach(function (el) { el.classList.add('visivel'); });
        return;
    }
    var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                obs.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    alvos.forEach(function (el, i) {
        el.style.transitionDelay = (i * 0.08) + 's';
        obs.observe(el);
    });
})();

//SEÇÃO EMPRESAS PARCEIRAS

// Animação de entrada dos cards ao rolar a página
const cards = document.querySelectorAll('.parceiro-card');
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, i) => {
    if (entrada.isIntersecting) {
        setTimeout(() => entrada.target.classList.add('visivel'), i * 80);
        observador.unobserve(entrada.target);
    }
    });
}, { threshold: 0.2 });
cards.forEach(card => observador.observe(card));

//FOOTER

// Atualiza o ano automaticamente
    document.getElementById('ano').textContent = new Date().getFullYear();

// Gravuras: se a imagem carregar, esconde o espaço reservado; se não, mantém o aviso
document.querySelectorAll('.gravura img').forEach(img => {
const figura = img.closest('.gravura');
const mostrar = () => figura.classList.add('tem-imagem');
const esconder = () => { img.style.display = 'none'; };
if (img.complete && img.naturalWidth > 0) mostrar();
img.addEventListener('load', mostrar);
img.addEventListener('error', esconder);
});

// Mostra o botão de voltar ao topo ao rolar a página
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
    btnTopo.style.display = 'flex';
    } else {
    btnTopo.style.display = 'none';
    }
});

btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
