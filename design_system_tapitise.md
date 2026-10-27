# 🌿 Tapítise — Design System Core (v1.0)

> **Essência da Marca:** Artesanal, orgânica, confiável e voltada ao crescimento. Inspirada em xilogravura clássica, botânica e elementos naturais, combinando sofisticação editorial com funcionalidade digital moderna.

---

## 📚 Sumário
1. [Visão Geral & Marca](#1-visão-geral--marca)
2. [Cores (Color Tokens)](#2-cores-color-tokens)
3. [Tipografia](#3-tipografia)
4. [Espaçamento & Grid](#4-espaçamento--grid)
5. [Elevação & Texturas](#5-elevação--texturas)
6. [Bordas & Raios (Border Radius)](#6-bordas--raios-border-radius)
7. [Iconografia & Ilustração](#7-iconografia--ilustração)
8. [Componentes Básicos (UI Kit)](#8-componentes-básicos-ui-kit)
9. [Diretrizes de Acessibilidade & Uso](#9-diretrizes-de-acessibilidade--uso)

---

## 1. Visão Geral & Marca

A **Tapítise** carrega uma identidade fortemente enraizada na estética de gravura em madeira (*woodcut* / xilogravura), tons terrosos/botânicos e um contraste caloroso de papel kraft/creme vintage sobre verde-floresta escuro.

### Personalidade de Interface
* **Orgânica & Quente:** Evita brancos puros e cinzas frios. Usa tons creme, papel e verdes profundos.
* **Editorial & Atemporal:** Tipografia forte com serifa marcante para destaques, combinada com sans-serif limpa para leitura de dados/tabelas.
* **Texturizada:** Elementos visuais pontuais que remetem à estampa manual e linoleogravura.

---

## 2. Cores (Color Tokens)

### 2.1 Cores Primárias (Paleta da Imagem)

| Nome do Token | Hexadecimal | RGB | Descrição & Uso |
| :--- | :--- | :--- | :--- |
| `color-forest-dark` | `#1A3B2B` | `26, 59, 43` | Verde floresta profundo (Fundo primário da marca, headers, cards de destaque) |
| `color-forest-medium` | `#2D5540` | `45, 85, 64` | Verde intermediário (Hover, estados ativos, bordas secundárias) |
| `color-cream-base` | `#E8DFC8` | `232, 223, 200` | Creme / Papel Vintage (Texto principal sobre escuro, fundo primário claro) |
| `color-cream-light` | `#F4EFE2` | `244, 239, 226` | Fundo de páginas no modo claro, cards claros |

### 2.2 Cores Secundárias e Acentos

| Nome do Token | Hexadecimal | RGB | Descrição & Uso |
| :--- | :--- | :--- | :--- |
| `color-earth-amber` | `#C88238` | `200, 130, 56` | Âmbar terroso (Destaque secundário, badges, CTA alternativo) |
| `color-charcoal` | `#181C19` | `24, 28, 25` | Preto carvão (Texto em fundos claros, linhas de ilustração) |
| `color-sand` | `#D2C5A7` | `210, 197, 167` | Divisores, bordas sutis e backgrounds desabilitados |

### 2.3 Cores Semânticas (Status)

| Status | Hex | Token |
| :--- | :--- | :--- |
| **Sucesso** | `#285A3A` | `color-success` |
| **Aviso** | `#C87A28` | `color-warning` |
| **Erro** | `#8B2E2E` | `color-error` |
| **Info** | `#3B5B6D` | `color-info` |

---

## 3. Tipografia

A hierarquia tipográfica mistura a elegância clássica de uma serifa expressiva com a funcionalidade de uma sans-serif legível em telas pequenas.

### 3.1 Famílias de Fontes

* **Display / Títulos (Primary Serif):** `Fraunces`, `Cinzel` ou `Playfair Display` (Garamond/Georgia como fallback).
* **Corpo de Texto / UI (Secondary Sans):** `Plus Jakarta Sans`, `Inter` ou `Source Sans Pro`.
* **Subtítulos / Captions All-Caps:** `Cinzel` ou `Cormorant Garamond` (com `letter-spacing` amplo).

### 3.2 Escala Tipográfica (Desktop & Mobile)

```css
/* Tokens Tipográficos CSS */
--font-family-display: 'Fraunces', 'Georgia', serif;
--font-family-body: 'Plus Jakarta Sans', -apple-system, sans-serif;

/* Sizes */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 2rem;     /* 32px */
--text-4xl: 2.75rem;  /* 44px */
--text-5xl: 3.5rem;   /* 56px */
```

### 3.3 Regras de Aplicação Tipográfica
* **H1 / Hero Headings:** Serifa minúscula fluida com acentuação marcante (ex: `tapítise`).
* **Sub-headers de Marca / Subtitles:** All-caps com tracking amplo (`letter-spacing: 0.15em; font-size: 0.875rem; font-weight: 600;`).
* **Corpo de Texto:** Sans-serif com bom espaçamento entre linhas (`line-height: 1.6`).

---

## 4. Espaçamento & Grid

Sistema baseado na escala clássica de **8px**.

### 4.1 Escala de Espaçamento

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem;  /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem;    /* 16px */
--space-6: 1.5rem;  /* 24px */
--space-8: 2rem;    /* 32px */
--space-12: 3rem;   /* 48px */
--space-16: 4rem;   /* 64px */
--space-24: 6rem;   /* 96px */
```

### 4.2 Grid
* **Mobile (375px+):** 4 colunas | Margem: 16px | Gutter: 16px
* **Tablet (768px+):** 8 colunas | Margem: 32px | Gutter: 24px
* **Desktop (1200px+):** 12 colunas | Margem: Auto | Max-width: 1280px | Gutter: 32px

---

## 5. Elevação & Texturas

Ao invés de sombras suaves e puramente digitais, o sistema da Tapítise usa sombras de alto contraste ("hard shadow") ou bordas definidas, reforçando a estética de prensa/xilogravura.

### 5.1 Sombras & Sombras Prensa (Woodcut Shadows)

```css
/* Elevação Suave (Cards padrões) */
--shadow-sm: 0 2px 4px rgba(24, 28, 25, 0.08);

/* Elevação Marcada estilo Prensa (Botões e Cards Interativos) */
--shadow-woodcut: 3px 3px 0px #181C19;
--shadow-woodcut-lg: 5px 5px 0px #181C19;
```

### 5.2 Texturas de Fundo
* **Papel Granulado:** Aplicação opcional de textura sutil de ruído (`opacity: 0.03`) sobre `#E8DFC8` ou `#1A3B2B`.

---

## 6. Bordas & Raios (Border Radius)

A marca preza por formas levemente orgânicas ou cantos secos/artesanais, evitando arredondamentos exagerados (pills/pills extremas), exceto em tags pequenas.

```css
--radius-none: 0px;
--radius-sm: 3px;    /* Padrão para inputs, cards e botões artesanais */
--radius-md: 6px;    /* Cards grandes e modais */
--radius-lg: 12px;   /* Modais e containers destacados */
--radius-full: 9999px; /* Badges e avatares */

--border-width-thin: 1px;
--border-width-thick: 2px; /* Usado para reforçar estilo xilogravura */
```

---

## 7. Iconografia & Ilustração

### 7.1 Estilo Ilustrativo
* **Estilo:** Linocut / Xilogravura / Hachuras manuais.
* **Linhas:** Traços pretos/carvão ou creme sobre fundos verdes.
* **Temática:** Botânica (folhas, ramos), fauna (coelho/lebre, animais da floresta), elementos de aceleração e crescimento orgânico.

### 7.2 Ícones de Interface (UI Icons)
* Usar conjunto de ícones de linha fina a média (`stroke-width: 1.75px` ou `2px`), preferencialmente com terminação ligeiramente arredondada ou reta tradicional (ex: *Lucide Icons*, *Phosphor Icons* no modo Regular/Bold).

---

## 8. Componentes Básicos (UI Kit)

### 8.1 Botões

#### Botão Primário (Dark / Forest)
* **Fundo:** `#1A3B2B`
* **Texto:** `#E8DFC8`
* **Borda:** 1px solid `#1A3B2B`
* **Hover:** Fundo `#2D5540`, `transform: translateY(-1px)`
* **Active:** `shadow-woodcut` de 2px

```html
<button class="btn btn-primary">Começar Agora</button>
```

#### Botão Secundário (Creme / Kraft)
* **Fundo:** `#E8DFC8`
* **Texto:** `#1A3B2B`
* **Borda:** 1.5px solid `#1A3B2B`
* **Hover:** Fundo `#F4EFE2`

---

### 8.2 Cards (Cartões)

```html
<!-- Card Estilo Floresta -->
<div class="card card-forest">
  <span class="badge">ACCELERATOR</span>
  <h3 class="card-title">Programa de Impulso</h3>
  <p class="card-body">Acelere seu projeto com nossa metodologia orgânica.</p>
</div>
```

**Estilização Sugerida:**
* **Fundo:** `#1A3B2B`
* **Texto:** `#E8DFC8`
* **Borda:** `1px solid #2D5540`
* **Padding:** `24px` (`--space-6`)
* **Raio:** `6px` (`--radius-md`)

---

### 8.3 Campos de Entrada (Inputs)

* **Fundo:** `#F4EFE2` (em modo claro) ou `#122A1E` (em modo escuro)
* **Borda:** `1.5px solid #D2C5A7`
* **Texto:** `#181C19`
* **Placeholder:** `#8C826B`
* **Foco:** Borda `#1A3B2B` com `outline` sutil em tom âmbar `#C88238`.

---

## 9. Diretrizes de Acessibilidade & Uso

1. **Contraste de Cor (WCAG AA):**
   * Texto em `#E8DFC8` sobre fundo `#1A3B2B` possui razão de contraste de **10.5:1** (Aprovado AAA).
   * Texto em `#181C19` sobre fundo `#E8DFC8` possui razão de contraste de **11.2:1** (Aprovado AAA).
2. **Uso de Cores:**
   * Nunca use apenas a cor para transmitir estados (ex: erro/sucesso). Sempre acompanhe de ícones explicativos e textos claros.
3. **Foco Visível:**
   * Mantenha o indicador de foco em navegação por teclado destacado utilizando um anel de foco em `#C88238` (Âmbar).

---

*Documentação mantida pela equipe de Design & Produto da **Tapítise**.*