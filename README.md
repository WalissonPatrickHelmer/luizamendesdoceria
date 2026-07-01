# Luiza Mendes Doceria 🍰

Site institucional/landing page para a confeitaria artesanal **Luiza Mendes Doceria**, desenvolvido em **HTML5, CSS3 e JavaScript puro** (sem frameworks ou bibliotecas externas além de fontes e ícones via CDN).

# 🍰 Luiza Mendes Doceria

<p align="center">

<a href="https://walissonpatrickhelmer.github.io/luizamendesdoceria/" target="_blank">
  🌐 Acessar Projeto Online
</a>

</p>

Landing Page profissional desenvolvida para a **Luiza Mendes Doceria**, uma confeitaria artesanal especializada em bolos e doces personalizados.

O projeto foi criado com foco em apresentar a marca de forma elegante, moderna e profissional, valorizando os produtos e facilitando o contato dos clientes através do WhatsApp.

---

## 📁 Estrutura do projeto

```
luiza-mendes-doceria/
├── index.html          → estrutura da página (todo o conteúdo/textos)
├── css/
│   └── style.css        → todo o estilo visual e responsividade
├── js/
│   └── script.js         → todas as interações (menu, carrossel, animações)
├── images/
│   ├── bolo.png
│   ├── doce1.png
│   ├── doce2.png
│   ├── doce3.png
│   ├── doce4.png
│   └── logo_pessoa.png
└── README.md
```

## ▶️ Como abrir o site

1. Extraia/coloque esta pasta em `luizamendesdoceria` (ou no nome que preferir).
2. Dê duplo clique em **index.html** — ele abre direto no navegador, sem precisar de servidor ou instalação.
3. Pronto. O site já funciona offline, com exceção das fontes (Google Fonts) e ícones (Font Awesome), que são carregados via internet. Se quiser que funcione 100% offline, será necessário baixar essas fontes/ícones localmente.

## ⚙️ O que já está pronto

- **Seções**: Hero, Sobre, Produtos, Galeria, Como Funciona, Depoimentos e Contato.
- **Menu responsivo** com botão hambúrguer no celular.
- **Animações de entrada** ao rolar a página (scroll reveal).
- **Carrossel de depoimentos** com setas, indicadores (dots), autoplay e suporte a arrastar no celular (swipe).
- **Botão flutuante do WhatsApp** + **botão "voltar ao topo"**.
- **Totalmente responsivo**: desktop, tablet e celular.

## ✏️ O que você precisa personalizar

Antes de publicar o site, troque os seguintes pontos no `index.html`:

1. **Número do WhatsApp**: procure por `5500000000000` (em todos os links `wa.me/...`) e substitua pelo número real, no formato `55DDDNÚMERO` (ex: `5511999998888`).
2. **Link do Instagram**: procure por `https://instagram.com/` no rodapé/seção de contato e troque pelo perfil real.
3. **Depoimentos**: estão no `index.html`, dentro da seção `<section class="depoimentos">` — basta editar os textos e nomes, ou duplicar o bloco `<li class="depoimento">...</li>` para adicionar mais.
4. **Textos e preços**: todos os textos estão diretamente no HTML, em português, fáceis de localizar e editar.

## 🎨 Identidade visual

| Cor             | Hex       | Uso                                  |
|-----------------|-----------|---------------------------------------|
| Creme           | `#F8EDE3` | Fundos claros                         |
| Rosa suave      | `#D8A7B1` | Detalhes, destaques, botões secundários |
| Chocolate       | `#8B5E3C` | Acentos e textos de apoio             |
| Chocolate escuro| `#5A3A22` | Títulos, botões principais, rodapé    |
| Branco          | `#FFFFFF` | Fundos de cards e contraste           |

**Tipografia:**
- Títulos → `Playfair Display` (elegante, serifada)
- Textos → `Poppins`

## 🚀 Publicando o site (deixar online de verdade)

Para o site sair do seu computador e ficar acessível por um link, algumas opções simples e gratuitas:
- **Netlify** ou **Vercel**: arraste a pasta do projeto e ele gera um link público em minutos.
- **GitHub Pages**: suba o projeto para um repositório no GitHub e ative o GitHub Pages nas configurações.

---
Desenvolvido como projeto real e peça de portfólio Front-End.
