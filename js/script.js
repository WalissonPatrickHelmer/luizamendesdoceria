/* ===================================================================
   LUIZA MENDES DOCERIA — SCRIPT.JS
   Funcionalidades:
   1. Header com fundo ao rolar a página
   2. Menu mobile responsivo
   3. Scroll suave + fechamento automático do menu
   4. Animações de entrada ao rolar (Intersection Observer)
   5. Galeria — carrossel alternante (1 grande + 4 pequenas)
   6. Carrossel de depoimentos
   7. Botão "voltar ao topo"
   8. Ano atual automático no rodapé
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. HEADER COM FUNDO AO ROLAR ===== */
  const header = document.getElementById('header');
  const aplicarEstiloHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };
  aplicarEstiloHeader();
  window.addEventListener('scroll', aplicarEstiloHeader, { passive: true });

  /* ===== 2. MENU MOBILE ===== */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  const alternarMenu = () => {
    const estaAberto = nav.classList.toggle('is-aberto');
    menuToggle.classList.toggle('is-active', estaAberto);
    menuToggle.setAttribute('aria-expanded', estaAberto);
    document.body.style.overflow = estaAberto ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', alternarMenu);

  /* ===== 3. FECHAR MENU AO CLICAR EM UM LINK (mobile) ===== */
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-aberto')) {
        alternarMenu();
      }
    });
  });

  /* ===== 4. ANIMAÇÕES DE ENTRADA AO ROLAR A TELA ===== */
  const elementosAnimados = document.querySelectorAll('[data-anim]');

  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada, indice) => {
        if (entrada.isIntersecting) {
          // pequeno atraso escalonado para elementos lado a lado (ex: cards)
          const atraso = (indice % 3) * 90;
          setTimeout(() => entrada.target.classList.add('is-visivel'), atraso);
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    elementosAnimados.forEach(el => observador.observe(el));
  } else {
    // fallback para navegadores muito antigos: mostra tudo de imediato
    elementosAnimados.forEach(el => el.classList.add('is-visivel'));
  }

  /* ===== 5. GALERIA — CARROSSEL ALTERNANTE (1 grande + 4 pequenas) ===== */
  const galeriaGrid = document.getElementById('galeriaGrid');
  const galeriaDots = document.getElementById('galeriaDots');

  if (galeriaGrid) {
    // banco de imagens que vão se revezando pelos 5 espaços (a cada rodada, todas passam pela posição grande)
    const imagensGaleria = [
      { src: 'images/doce3.png', alt: 'Mesa de doces finos para evento, com taças de trufas e brigadeiros', legenda: 'Mesa de doces para eventos' },
      { src: 'images/bolo.png', alt: 'Bolo artesanal personalizado, decorado à mão', legenda: 'Bolos sob encomenda' },
      { src: 'images/doce4.png', alt: 'Doces personalizados decorados com detalhes coloridos', legenda: 'Doces personalizados' },
      { src: 'images/doce1.png', alt: 'Brigadeiros gourmet em tons pastel', legenda: 'Doces gourmet' },
      { src: 'images/doce2.png', alt: 'Kit de doces embalado para presente', legenda: 'Kits para presente' },
    ];

    const slots = Array.from(galeriaGrid.querySelectorAll('.galeria__slot'));
    let deslocamento = 0;
    let intervaloGaleria;

    function renderizarSlots() {
      slots.forEach((slot, i) => {
        const dados = imagensGaleria[(i + deslocamento) % imagensGaleria.length];
        const img = slot.querySelector('img');
        const legenda = slot.querySelector('figcaption');

        // remove a classe para disparar a transição de entrada (fade + leve subida)
        img.classList.remove('is-ativa');
        legenda.classList.remove('is-ativa');

        // pequena espera para o navegador registrar a troca antes de animar de novo
        setTimeout(() => {
          img.src = dados.src;
          img.alt = dados.alt;
          legenda.textContent = dados.legenda;
          requestAnimationFrame(() => {
            img.classList.add('is-ativa');
            legenda.classList.add('is-ativa');
          });
        }, 60);
      });

      if (galeriaDots) {
        Array.from(galeriaDots.children).forEach((dot, i) => {
          dot.classList.toggle('is-ativo', i === deslocamento % imagensGaleria.length);
        });
      }
    }

    // cria os indicadores (um para cada imagem do banco)
    if (galeriaDots) {
      imagensGaleria.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
          deslocamento = i;
          renderizarSlots();
          reiniciarGaleriaAuto();
        });
        galeriaDots.appendChild(dot);
      });
    }

    function proximaRodadaGaleria() {
      deslocamento = (deslocamento + 1) % imagensGaleria.length;
      renderizarSlots();
    }

    function reiniciarGaleriaAuto() {
      clearInterval(intervaloGaleria);
      intervaloGaleria = setInterval(proximaRodadaGaleria, 4200);
    }

    renderizarSlots();
    reiniciarGaleriaAuto();
  }

  /* ===== 6. CARROSSEL DE DEPOIMENTOS ===== */
  const lista = document.getElementById('depLista');
  const itens = lista ? Array.from(lista.children) : [];
  const btnPrev = document.getElementById('depPrev');
  const btnNext = document.getElementById('depNext');
  const containerDots = document.getElementById('depDots');

  if (lista && itens.length > 0) {
    let indiceAtual = 0;
    let intervaloAuto;

    // cria os indicadores (dots) dinamicamente
    itens.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('depoimentos__dot');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      dot.addEventListener('click', () => irParaDepoimento(i));
      containerDots.appendChild(dot);
    });
    const dots = Array.from(containerDots.children);

    function atualizarCarrossel() {
      lista.style.transform = `translateX(-${indiceAtual * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('is-ativo', i === indiceAtual));
    }

    function irParaDepoimento(indice) {
      indiceAtual = (indice + itens.length) % itens.length;
      atualizarCarrossel();
      reiniciarAutoplay();
    }

    function proximoDepoimento() { irParaDepoimento(indiceAtual + 1); }
    function depoimentoAnterior() { irParaDepoimento(indiceAtual - 1); }

    function iniciarAutoplay() {
      intervaloAuto = setInterval(proximoDepoimento, 6000);
    }
    function reiniciarAutoplay() {
      clearInterval(intervaloAuto);
      iniciarAutoplay();
    }

    btnNext.addEventListener('click', proximoDepoimento);
    btnPrev.addEventListener('click', depoimentoAnterior);

    // suporte a deslizar no celular (touch)
    let toqueInicialX = 0;
    lista.addEventListener('touchstart', (e) => {
      toqueInicialX = e.touches[0].clientX;
    }, { passive: true });

    lista.addEventListener('touchend', (e) => {
      const toqueFinalX = e.changedTouches[0].clientX;
      const diferenca = toqueInicialX - toqueFinalX;
      if (Math.abs(diferenca) > 40) {
        diferenca > 0 ? proximoDepoimento() : depoimentoAnterior();
      }
    }, { passive: true });

    atualizarCarrossel();
    iniciarAutoplay();
  }

  /* ===== 7. BOTÃO VOLTAR AO TOPO ===== */
  const btnVoltarTopo = document.getElementById('voltarTopo');
  window.addEventListener('scroll', () => {
    btnVoltarTopo.classList.toggle('is-visivel', window.scrollY > 500);
  }, { passive: true });

  btnVoltarTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== 8. ANO ATUAL NO RODAPÉ ===== */
  const spanAno = document.getElementById('anoAtual');
  if (spanAno) spanAno.textContent = new Date().getFullYear();

});
