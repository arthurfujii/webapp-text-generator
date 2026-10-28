# 🌿 Tapítise — Design System Core (v2.0)

> **Essência da marca:** um almanaque de campo impresso em papel manteiga. Artesanal, orgânico, editorial e direto — a xilogravura, a botânica e a ilustração científica encontram a clareza de uma interface digital.

**Novo na v2.0:** paleta oliva/papel, painel editorial dividido, serifa editorial para leitura, mascote **tapiti**, rodapé de marca e grafismos topográficos. A atualização é **aditiva**: todos os tokens e componentes da v1.0 continuam válidos.

> **Referência visual da v2.0:** peça editorial "10 trilhas por onde ir / 10 matas para evitar", com painel dividido papel + oliva e rodapé de marca.

---

## 📚 Sumário

1. [Visão Geral & Princípios](#1-visão-geral--princípios)
2. [Cores (Color Tokens)](#2-cores-color-tokens)
3. [Tipografia](#3-tipografia)
4. [Layout & Grid](#4-layout--grid)
5. [Superfícies, Texturas & Grafismos](#5-superfícies-texturas--grafismos)
6. [Bordas, Raios & Elevação](#6-bordas-raios--elevação)
7. [Iconografia, Ilustração & Marca](#7-iconografia-ilustração--marca)
8. [Componentes (UI Kit)](#8-componentes-ui-kit)
9. [Padrões Editoriais (Do's & Don'ts)](#9-padrões-editoriais-dos--donts)
10. [Acessibilidade & Uso](#10-acessibilidade--uso)
11. [Implementação (Tokens & Classes)](#11-implementação-tokens--classes)
12. [Changelog](#12-changelog)

---

## 1. Visão Geral & Princípios

A Tapítise carrega uma identidade enraizada na estética de gravura em madeira (*woodcut* / xilogravura), em tons terrosos e botânicos, com contraste caloroso de papel kraft/creme sobre verdes de floresta. A referência desta versão é uma peça editorial de almanaque: dois campos de cor lado a lado, tipografia serifada, ilustração científica e um rodapé de marca com o coelho **tapiti**.

### 1.1 Personalidade de Interface

* **Orgânica & quente:** evita brancos puros e cinzas frios. Usa papel, creme, oliva e verdes profundos.
* **Editorial & atemporal:** serifa expressiva para ideias e narrativa; sans-serif limpa para interface, dados e controles.
* **Texturizada, mas contida:** grão de papel, linhas topográficas e botânica entram nas bordas, nunca atrás do texto.
* **Direta & artesanal:** frases curtas, títulos editoriais em caixa baixa, números de lista visíveis e nenhum excesso de efeitos.

### 1.2 Princípios

1. **Papel antes de tela.** Campos de cor chapados, full-bleed e sem gradiente. A composição deve parecer impressa, não montada em camadas.
2. **Duas vozes tipográficas.** Serifa para leitura editorial; sans para interface. Não misture as duas no mesmo parágrafo.
3. **Contraste de campos.** Uma composição editorial usa no máximo dois campos grandes (papel + oliva) e um acento (âmbar). O acento não passa de ~10% da área.
4. **Ilustração com função.** Mascote, folhagem e topografia ancoram as bordas e criam ritmo; nunca competem com o texto.
5. **Cortes secos.** Painéis e imagens têm cantos retos. Círculos são reservados a ícones de contato, badges e avatares.

### 1.3 Composição assinatura

A peça canônica é um **painel editorial dividido**:

* Dois campos de cor 50/50, sem gutter, ocupando toda a largura.
* Campo esquerdo em papel (`#EFE4C7`) com título e lista em verde profundo.
* Campo direito em oliva (`#55663A`) com título e lista em creme.
* Rodapé full-width em verde profundo (`#122A1E`), com logotipo, mascote, informação institucional e contatos.
* O mascote **tapiti** apoia-se na emenda entre os painéis e o rodapé.

---

## 2. Cores (Color Tokens)

### 2.1 Campos de cor

| Nome do Token | Hexadecimal | RGB | Descrição & Uso |
| :--- | :--- | :--- | :--- |
| `color-cream-paper` | `#EFE4C7` | `239, 228, 199` | Papel editorial (campo claro, painel de "do's", fundos de conteúdo) |
| `color-forest-olive` | `#55663A` | `85, 102, 58` | Verde-oliva (campo secundário, painel de "don'ts", blocos de citação) |
| `color-forest-olive-deep` | `#46552F` | `70, 85, 47` | Oliva profunda (bordas, linhas topográficas, hover do campo oliva) |
| `color-forest-olive-light` | `#6B7C4E` | `107, 124, 78` | Oliva clara (detalhes gráficos, estados sutis) |
| `color-forest-deep` | `#122A1E` | `18, 42, 30` | Verde profundo (rodapé de marca, tinta principal, fundos de alto contraste) |
| `color-forest-dark` | `#1A3B2B` | `26, 59, 43` | Verde floresta (títulos, botão primário, superfícies de marca) |
| `color-forest-medium` | `#2D5540` | `45, 85, 64` | Verde intermediário (hover, bordas, texto secundário sobre claro) |
| `color-forest-light` | `#4C7059` | `76, 112, 89` | Verde claro (detalhes, estados) |
| `color-cream-base` | `#E8DFC8` | `232, 223, 200` | Creme base (texto sobre verde, fundo de UI) |
| `color-cream-light` | `#F4EFE2` | `244, 239, 226` | Creme claro (fundo de páginas do app, cards) |
| `color-cream-dark` | `#D9CEB4` | `217, 206, 180` | Creme escuro (bordas suaves, estados) |
| `color-earth-amber` | `#C88238` | `200, 130, 56` | Âmbar terroso (ícones de contato, badges, foco) |
| `color-earth-amber-dark` | `#8A531F` | `138, 83, 31` | Âmbar escuro (texto âmbar sobre papel/creme) |
| `color-earth-amber-light` | `#E3A45E` | `227, 164, 94` | Âmbar claro (detalhes sobre fundos escuros) |
| `color-charcoal` | `#181C19` | `24, 28, 25` | Preto carvão (texto neutro em fundos claros, linhas de ilustração) |
| `color-sand` | `#D2C5A7` | `210, 197, 167` | Areia (divisores, bordas sutis, fundos desabilitados) |
| `color-muted` | `#8C826B` | `140, 130, 107` | Placeholders e estados desabilitados. **Não use para texto corrido.** |

### 2.2 Pares aprovados (WCAG)

| Texto | Fundo | Contraste | Nível | Uso recomendado |
| :--- | :--- | :--- | :--- | :--- |
| `#122A1E` (forest-deep) | `#EFE4C7` (paper) | **12.1:1** | AAA | Títulos e corpo no painel de papel |
| `#1A3B2B` (forest-dark) | `#EFE4C7` (paper) | **9.7:1** | AAA | Títulos e corpo no painel de papel |
| `#181C19` (charcoal) | `#E8DFC8` (cream-base) | **13.0:1** | AAA | Texto neutro em UI clara |
| `#E8DFC8` (cream-base) | `#122A1E` (forest-deep) | **11.5:1** | AAA | Texto no rodapé e em fundos profundos |
| `#E8DFC8` (cream-base) | `#1A3B2B` (forest-dark) | **9.3:1** | AAA | Texto em cards de marca |
| `#EFE4C7` (paper) | `#55663A` (olive) | **5.0:1** | AA / AAA large | Títulos e listas no painel de oliva |
| `#F4EFE2` (cream-light) | `#46552F` (olive-deep) | **7.0:1** | AAA | Texto pequeno sobre oliva profunda |
| `#122A1E` (forest-deep) | `#C88238` (amber) | **4.9:1** | AA | Ícone dentro do círculo âmbar |
| `#8A531F` (amber-dark) | `#EFE4C7` (paper) | **5.0:1** | AA | Links e destaques em texto sobre papel |
| `#2D5540` (forest-medium) | `#F4EFE2` (cream-light) | **7.4:1** | AAA | Texto secundário em UI clara |

### 2.3 Pares proibidos

| Texto | Fundo | Contraste | Motivo |
| :--- | :--- | :--- | :--- |
| `#1A3B2B` (forest-dark) | `#55663A` (olive) | **2.0:1** | Ilegível |
| `#C88238` (amber) | `#55663A` (olive) | **2.0:1** | Ilegível; use papel/creme |
| `#8C826B` (muted) | `#EFE4C7` (paper) | **3.0:1** | Reprovado para texto; apenas decorativo/desabilitado |

### 2.4 Regras de combinação

* Em uma peça editorial, use **dois campos grandes + um acento**. Não adicione um terceiro verde só para "variar".
* O painel de "do's" é papel; o de "don'ts" é oliva. A inversão é permitida desde que o contraste seja mantido.
* Nunca use oliva e `forest-medium` lado a lado sem um separador de papel ou verde profundo — os dois se confundem.
* O âmbar é acento, não status. Não use âmbar para "aviso" em peças editoriais; use apenas ícones, badges e foco.
* Não use vermelho para "don'ts". O contraste estrutural entre papel e oliva já comunica a divisão.
* Não use branco puro (`#FFFFFF`) em grandes áreas. O papel (`#EFE4C7`) é o branco da marca.
* Para texto pequeno sobre oliva, escureça o campo para `olive-deep` (`#46552F`) e use `cream-light` (`#F4EFE2`).

### 2.5 Cores semânticas (status)

| Status | Hex | Token |
| :--- | :--- | :--- |
| **Sucesso** | `#285A3A` | `color-success` |
| **Aviso** | `#C87A28` | `color-warning` |
| **Erro** | `#8B2E2E` | `color-error` |
| **Info** | `#3B5B6D` | `color-info` |

Cores de status são exclusivas de feedback de interface. Não use vermelho, amarelo ou azul de status como campos editoriais.

---

## 3. Tipografia

A hierarquia mistura a elegância de uma serifa expressiva com a funcionalidade de uma sans-serif legível em telas pequenas. A grande novidade da v2.0 é o uso da serifa também no **corpo editorial** — não apenas em títulos.

### 3.1 Famílias

| Função | Família | Pesos | Observação |
| :--- | :--- | :--- | :--- |
| Display / Editorial | **Fraunces** | 400, 500, 600, 700 | Títulos, listas editoriais, citações, nomes científicos |
| UI / Corpo funcional | **Plus Jakarta Sans** | 400, 500, 600, 700 | Controles, formulários, metadados, textos de interface |
| Fallbacks | Georgia, Cambria, Times New Roman; system-ui | — | Apenas quando a fonte web não carregar |

* A serifa deve ser usada com `font-optical-sizing: auto` para preservar o desenho nos diferentes tamanhos.
* Em tamanhos abaixo de **16px**, prefira Plus Jakarta Sans para textos longos de interface. A serifa editorial é para leitura ampla (18px+).
* Nomes científicos e termos estrangeiros vão em itálico: `<i lang="la">Sylvilagus brasiliensis</i>`.

### 3.2 Escala tipográfica

| Token | Tamanho / Linha | Família / Peso | Uso |
| :--- | :--- | :--- | :--- |
| `display-xl` | `56px / 1.02` | Fraunces 600 | Hero editorial em desktop |
| `display-lg` | `44px / 1.05` | Fraunces 600 | Título de painel dividido (base; o componente usa `clamp()`) |
| `display-md` | `32px / 1.10` | Fraunces 600 | Título de seção |
| `editorial-lg` | `20px / 1.45` | Fraunces 400 | Listas e manifesto em desktop |
| `editorial` | `18px / 1.45` | Fraunces 400 | Listas em tablet/mobile |
| `body` | `16px / 1.60` | Jakarta 400 | Corpo de interface |
| `body-sm` | `14px / 1.50` | Jakarta 400 | Metadados, legendas |
| `label` | `11px / 1.00` | Jakarta 600, `0.18em` | Eyebrows e labels all-caps |
| `lockup-sub` | `10px / 1.00` | Jakarta 600, `0.28em` | "ACELERADORA" sob o logotipo |

```css
/* Tokens tipográficos */
--font-family-display: 'Fraunces', Georgia, Cambria, 'Times New Roman', serif;
--font-family-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 2rem;       /* 32px */
--text-4xl: 2.75rem;    /* 44px */
--text-5xl: 3.5rem;     /* 56px */

--tracking-brand: 0.15em;
--tracking-lockup: 0.28em;
```

### 3.3 Regras de aplicação

* **Títulos editoriais:** caixa baixa após o número (ex.: `10 trilhas por onde ir`), preservando nomes próprios e siglas. Sem ponto final. Duas a três linhas no máximo; quebre manualmente para equilibrar as linhas e evitar palavras órfãs.
* **Títulos de interface:** sentence case.
* **Listas editoriais:** 18–20px, `line-height: 1.45`, medida de **30–34 caracteres** por linha. Nunca ultrapasse 45ch.
* **Corpo de interface:** 14–16px, `line-height: 1.6`, medida de 60–70ch.
* **Labels:** all-caps, 11px, peso 600, tracking `0.18em`. Use com moderação — no máximo um label por bloco.
* **Números de lista:** algarismos tabulares (`font-variant-numeric: tabular-nums`), seguidos de ponto. O marcador fica em uma coluna fixa, com o texto em hanging indent.
* **Itálico:** apenas para nomes científicos, termos estrangeiros e ênfase editorial. Não use itálico em blocos inteiros.
* **Sem drop caps, sem texto centralizado em blocos longos, sem caixa alta em títulos.**
* **"ACELERADORA":** sempre em sans, 10px, tracking `0.28em`, logo abaixo do logotipo. Não use a serifa nesse descritor.

---

## 4. Layout & Grid

### 4.1 Escala de espaçamento

Sistema baseado em **8px**.

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
```

### 4.2 Grid de interface

* **Mobile (375px+):** 4 colunas | Margem: 16px | Gutter: 16px
* **Tablet (768px+):** 8 colunas | Margem: 32px | Gutter: 24px
* **Desktop (1200px+):** 12 colunas | Margem: auto | Max-width: 1280px | Gutter: 32px

### 4.3 Painel editorial dividido

* **Proporção:** 50/50 no desktop. 55/45 é permitido quando um dos lados tem mais conteúdo, mas mantenha a emenda central como âncora visual.
* **Full-bleed:** ocupa 100% da largura da viewport; não use `max-width` no container externo.
* **Sem gutter, sem borda, sem raio:** a mudança de cor é a divisória.
* **Padding:** 56–64px no desktop; 32px no tablet; 24–28px no mobile.
* **Título → lista:** 32–40px.
* **Entre itens da lista:** 20–24px.
* **Medidas:** título em 2–3 linhas (≈14–18ch por linha); lista com 30–34ch.
* **Altura:** mínimo de 480px em cards editoriais; `100dvh` em heros de página inteira.
* **Mobile:** empilhe papel primeiro, oliva depois. Nunca intercale os itens dos dois painéis. O rodapé vem por último.

```css
.split-editorial {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .split-editorial {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.split-panel {
  padding: var(--space-6);
}

@media (min-width: 768px) {
  .split-editorial {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .split-panel {
    padding: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .split-panel {
    padding: var(--space-16);
  }
}
```

### 4.4 Rodapé de marca

* **Altura:** 176–200px no desktop; 160px no mobile.
* **Fundo:** `forest-deep` (`#122A1E`); texto em `cream-paper` (`#EFE4C7`).
* **Estrutura em três zonas:**
  1. Logotipo + descritor "ACELERADORA".
  2. Mascote + bloco "tapiti" (nome, espécie em itálico e descrição).
  3. Divisor vertical + contatos (e-mail e WhatsApp).
* **Divisor:** 1px, `cream-paper` a 25% de opacidade.
* **Contatos:** ícones em círculos âmbar de 40px, com glifo em `forest-deep`; texto em `cream-paper`; alvo de toque mínimo de 44px.
* **Mascote:** apoia-se na borda superior do rodapé e invade os painéis. O rodapé precisa de `overflow: visible` e o mascote de `z-index` acima dos campos.
* **Mobile:** empilhe logotipo, mascote, informação e contatos. O divisor vira uma linha horizontal de 1px.

### 4.5 Alinhamento

* Todo o texto editorial é **alinhado à esquerda**. Não centralize listas ou parágrafos longos.
* Alinhe o início do texto da lista com o início do título; o número fica em uma coluna à esquerda.
* Use alinhamento óptico para o logotipo e a ilustração; não confie apenas na caixa do arquivo.

---

## 5. Superfícies, Texturas & Grafismos

### 5.1 Campos chapados

Os painéis editoriais são **chapados**: sem gradiente, sem sombra, sem transparência. A riqueza vem da combinação de cores, tipografia e ilustração. Gradientes sutis são permitidos apenas em fundos de interface (como o `body` atual), nunca em painéis editoriais.

### 5.2 Texturas

| Textura | Especificação | Onde usar |
| :--- | :--- | :--- |
| **Grão de papel** | Ruído fractal a ~3% de opacidade, tile de 180px | Sobre o fundo geral da interface |
| **Linhas topográficas** | Traço de 1px, curvas orgânicas, 8–14% de opacidade | Cantos dos painéis; no máximo 40% da área do painel |
| **Ilustração botânica** | Traço + aquarela, verdes oliva/profundos | Canto inferior esquerdo; sangra 15–25% para fora do quadro |
| **Mascote tapiti** | Aquarela/gravura colorida, tons naturais | Emenda entre painéis e rodapé; centro-esquerda |

Regras:

* Texturas nunca ficam atrás de texto corrido. Se precisar, reduza a opacidade ou mova o grafismo para o canto.
* Use **um** grafismo de cada tipo por composição. Não repita o mesmo canto em ambos os painéis.
* Linhas topográficas: `cream-paper` a 10–14% sobre oliva/verde profundo; `forest-deep` a 6–8% sobre papel.
* Não anime texturas. Nada de parallax, zoom ou ruído em movimento.
* A ilustração botânica pode sobrepor a emenda entre painéis, mas nunca o texto.

### 5.3 Profundidade

A v2.0 é **mais plana** que a v1.0:

* Painéis editoriais: **sem sombra**.
* Botões, cards interativos e modais: podem usar `shadow-woodcut` (3px/5px) para reforçar a estética de prensa.
* A sombra dura é um acento de interação, não um efeito decorativo.

---

## 6. Bordas, Raios & Elevação

### 6.1 Raios

```css
--radius-none: 0px;     /* Painéis editoriais, imagens full-bleed, seções */
--radius-sm: 3px;       /* Inputs, botões artesanais, cards pequenos */
--radius-md: 6px;       /* Cards grandes e modais */
--radius-lg: 12px;      /* Modais/containers destacados */
--radius-full: 9999px;  /* Badges, avatares e ícones de contato */
```

* **Cantos retos são a regra** em composições editoriais. O arredondamento é exceção de UI.
* Não use pills em botões. `rounded-full` é reservado a badges, avatares e círculos de contato.
* Imagens editoriais e ilustrações não recebem máscara arredondada.

### 6.2 Bordas

```css
--border-width-thin: 1px;
--border-width-thick: 2px;
```

* Divisores internos: 1px `sand` ou `cream-paper/25`.
* Botão secundário: 1.5px `forest-dark`.
* Ênfase/xilogravura: 2px `forest-deep` ou `charcoal`.

### 6.3 Elevação

```css
--shadow-sm: 0 2px 4px rgba(24, 28, 25, 0.08);
--shadow-woodcut: 3px 3px 0px #181C19;
--shadow-woodcut-lg: 5px 5px 0px #181C19;
```

* Use `shadow-woodcut` apenas em elementos interativos (botões, cards clicáveis).
* Nunca aplique sombra em painéis de cor, no rodapé de marca ou em ilustrações.

---

## 7. Iconografia, Ilustração & Marca

### 7.1 Ícones de interface

* Conjunto: **Lucide** ou **Phosphor** (Regular/Bold), traço de 1.75–2px.
* Tamanho padrão: 18–20px; em botões, 16–18px.
* Cor: herda o texto (`currentColor`). Em círculos âmbar, use `forest-deep`.
* Ícones de marca (WhatsApp) usam o glifo oficial, sem redesenho ou distorção.
* Ícones nunca substituem rótulos em ações críticas; quando forem o único conteúdo, exigem `aria-label`.

### 7.2 Mascote oficial: tapiti

O **tapiti** é o coelho nativo brasileiro (*Sylvilagus brasiliensis*) e o guardião da marca. A ilustração é uma aquarela/gravura colorida, com pelagem em tons naturais de marrom, creme e carvão.

**Uso correto:**

* Posicione na base da composição, apoiado na emenda entre painéis e rodapé, ou no canto inferior de uma peça.
* Preserve as proporções e as cores originais.
* Dê espaço de respiro equivalente à altura das orelhas.
* Tamanho mínimo digital: 96px de altura.
* Use o arquivo oficial em PNG/WebP com transparência. O asset deve ficar em `public/brand/tapiti.png`.

**Nunca:**

* Recolorir, aplicar filtro, duotone ou contorno.
* Vetorizar, redesenhar ou recortar as orelhas/rosto.
* Rotacionar, espelhar ou distorcer.
* Repetir o mascote na mesma peça.
* Usar como ícone genérico, bullet ou textura.
* Colocar sobre fundo visualmente poluído ou atrás de texto.

**Acessibilidade:** se o mascote for decorativo e o texto "tapiti" estiver ao lado, use `alt=""`. Se ele for a única indicação da marca, use `alt="Tapiti, o coelho nativo brasileiro, mascote da Tapítise"`.

### 7.3 Ilustração botânica

* Tema: folhas, ramos e eucalipto, com traço de nanquim e preenchimento em aquarela.
* Paleta: `olive`, `olive-deep`, `forest-deep` e toques de `earth-amber`.
* Posição: canto inferior esquerdo, sangrando para fora do quadro.
* Uma única ilustração botânica por composição.
* Pode sobrepor a emenda entre painéis, mas nunca o texto.
* Não use a ilustração como padrão repetido ou marca d'água.

### 7.4 Linhas topográficas

* Curvas orgânicas e concêntricas, como um mapa de campo.
* Traço de 1px; opacidade baixa (8–14%).
* Ocupam um canto, no máximo 40% do painel.
* Servem para dar textura ao campo, não para comunicar informação.
* Não use em volta de textos longos nem em elementos interativos.

### 7.5 Logotipo e lockup

* O logotipo oficial é o wordmark **tapítise** em serifa pesada, com o til na letra "i".
* O descritor **ACELERADORA** fica logo abaixo, em sans, 10px, tracking `0.28em`, alinhado à esquerda.
* Use sempre o arquivo oficial; não recrie o wordmark com Fraunces.
* O asset deve ficar em `public/brand/tapitise-logo.svg` (com variantes clara e escura).
* Espaço de respiro mínimo: altura da letra "t" em todos os lados.
* Largura mínima digital: 120px.
* Sobre fundos escuros, use a versão em `cream-paper`; sobre fundos claros, `forest-deep`.
* Não estique, rotacione, aplique contorno ou sombra no logotipo.

---

## 8. Componentes (UI Kit)

### 8.1 Botões

#### Botão primário (floresta)

* **Fundo:** `#1A3B2B`
* **Texto:** `#E8DFC8`
* **Borda:** 1px solid `#1A3B2B`
* **Hover:** fundo `#2D5540`, `translateY(-1px)`
* **Active:** `shadow-woodcut` de 2px

```html
<button class="btn btn-primary">Começar agora</button>
```

#### Botão secundário (creme)

* **Fundo:** `#E8DFC8`
* **Texto:** `#1A3B2B`
* **Borda:** 1.5px solid `#1A3B2B`
* **Hover:** fundo `#F4EFE2`

#### Botão sobre oliva

* **Fundo:** `#EFE4C7`
* **Texto:** `#122A1E`
* **Borda:** 1px solid `#EFE4C7`
* **Hover:** fundo `#F4EFE2`
* **Sombra:** `3px 3px 0 #122A1E`
* Use apenas quando o botão estiver dentro de um painel oliva.

```html
<button class="btn btn-on-olive">Começar agora</button>
```

### 8.2 Painel editorial dividido

```html
<section class="split-editorial">
  <div class="split-panel surface-paper">
    <div class="topo-lines topo-lines-flip" aria-hidden="true"></div>
    <h2 class="editorial-title">
      10 trilhas por onde ir (to do's)
    </h2>
    <ol class="editorial-list" role="list">
      <li>a qualidade criativa precisa estar explícita</li>
      <li>mentalidade "TikTok-First"</li>
      <li>formato como convite, não interrupção</li>
    </ol>
  </div>

  <div class="split-panel surface-olive">
    <div class="topo-lines" aria-hidden="true"></div>
    <h2 class="editorial-title">
      10 matas para evitar (don'ts)
    </h2>
    <ol class="editorial-list" role="list">
      <li>incluir logos ou nomes da agência</li>
      <li>fazer "control c + control v" de outras premiações</li>
      <li>fazer um videocase chato ou puramente institucional</li>
    </ol>
  </div>
</section>
```

**Especificação:**

* Painel: `padding` de 56–64px no desktop; 24–32px no mobile.
* Título: Fraunces 600, `clamp(2.25rem, 4vw + 1rem, 3.5rem)` / 1.05, `letter-spacing: -0.02em`.
* Lista: Fraunces 400, 18–20px/1.45, `max-width: 34ch`.
* Marcador: coluna de 28px, alinhado à direita, `tabular-nums`; texto com `padding-left: 36px`.
* Espaço entre itens: 20–24px.
* Sem raio, sem sombra, sem borda entre os painéis.

### 8.3 Lista editorial numerada

```css
.editorial-list {
  counter-reset: editorial;
  max-width: 34ch;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-family-display);
  font-size: var(--text-lg);
  line-height: 1.45;
}

.editorial-list > li {
  counter-increment: editorial;
  position: relative;
  padding-left: 2.25rem;
}

.editorial-list > li + li {
  margin-top: var(--space-5);
}

.editorial-list > li::before {
  content: counter(editorial) ".";
  position: absolute;
  left: 0;
  top: 0;
  width: 1.75rem;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
```

* Use `<ol>` para listas ordenadas; `<ul>` para listas não ordenadas.
* O número visual é um reforço; a ordem é comunicada semanticamente pelo `<ol>`.
* Em Safari, `list-style: none` pode remover a semântica de lista. Adicione `role="list"` ao `<ol>` para preservá-la.
* Em listas de "do's/don'ts", mantenha 10 itens em cada lado e extensão semelhante.

### 8.4 Cards

```html
<div class="card card-forest">
  <span class="badge">ACELERADORA</span>
  <h3 class="card-title">Programa de impulso</h3>
  <p class="card-body">Acelere seu projeto com nossa metodologia orgânica.</p>
</div>
```

* **Card claro:** fundo `cream-light`, borda 1px `sand`, padding 24px, raio 6px.
* **Card floresta:** fundo `forest-dark`, texto `cream-base`, borda 1px `forest-medium`, padding 24px, raio 6px.
* **Card editorial:** fundo `paper` ou `forest-olive`, sem raio e sem sombra; use o painel dividido como referência.

### 8.5 Campos de entrada

* **Fundo:** `#F4EFE2` (claro) ou `#122A1E` (escuro)
* **Borda:** 1.5px solid `#D2C5A7`
* **Texto:** `#181C19`
* **Placeholder:** `#8C826B` (apenas placeholder; não use para texto informativo)
* **Foco:** borda `#1A3B2B` com anel âmbar `#C88238` a 35%

### 8.6 Chip de contato

```html
<a class="contact-chip" href="mailto:tapitise@gmail.com">
  <span class="contact-chip-icon" aria-hidden="true">
    <!-- ícone de envelope 18px -->
  </span>
  <span>tapitise@gmail.com</span>
</a>
```

**Especificação:**

* Círculo âmbar de 40px; glifo `forest-deep` de 18px.
* Texto `cream-paper`, Jakarta 400, 14–15px.
* Gap de 12px; alvo de toque mínimo de 44px.
* Hover: círculo `earth-amber-light` e sublinhado sutil no texto.
* Em fundos claros, troque o texto para `forest-deep` e mantenha o círculo âmbar.
* WhatsApp usa o glifo oficial, com link `https://wa.me/...`.

### 8.7 Rodapé de marca

```html
<footer class="brand-footer">
  <div class="brand-footer-inner">
    <div class="brand-footer-logo">
      <!-- logotipo oficial tapítise + ACELERADORA -->
    </div>

    <img
      class="brand-footer-mascot"
      src="/brand/tapiti.png"
      alt=""
      width="200"
      height="180"
    />

    <div class="brand-footer-info">
      <p class="brand-footer-name">tapiti</p>
      <p class="brand-footer-species"><i lang="la">Sylvilagus brasiliensis</i></p>
      <p class="brand-footer-description">o único coelho nativo brasileiro.</p>
    </div>

    <div class="brand-footer-divider" aria-hidden="true"></div>

    <div class="brand-footer-contacts">
      <a class="contact-chip" href="mailto:tapitise@gmail.com">...</a>
      <a class="contact-chip" href="https://wa.me/5511996201517">...</a>
    </div>
  </div>
</footer>
```

**Especificação:**

* Fundo `forest-deep`; texto `cream-paper`.
* Padding: 32px 40px no desktop; 24px no mobile.
* Grid desktop: `auto auto 1fr auto auto` (logo, mascote, info, divisor, contatos).
* Grid tablet (até 1023px): duas colunas; contatos ocupam a linha inteira.
* Grid mobile (até 639px): uma coluna; divisor horizontal.
* Logotipo em `cream-paper`; descritor em `cream-base` a 70%.
* Mascote com no máximo 200px de largura no desktop e 120px no mobile.
* Divisor vertical de 1px `cream-paper/25`.
* Contatos com ícones âmbar e texto `cream-paper`.

### 8.8 Badges

* **Badge claro:** fundo `earth-amber/10`, borda `earth-amber/40`, texto `earth-amber-dark`, all-caps 10px, tracking `0.15em`, raio full.
* **Badge escuro:** fundo `cream-base/10`, borda `cream-base/25`, texto `cream-base`, mesmas medidas.
* Badges são curtos (1–3 palavras) e não substituem títulos.

---

## 9. Padrões Editoriais (Do's & Don'ts)

O painel dividido é também um padrão de conteúdo. Ele funciona melhor quando os dois lados são **espelhados**: mesma quantidade de itens, mesma extensão de linha e paralelismo gramatical.

### 9.1 Estrutura

* **Título:** número + substantivo + verbo/expressão + parêntese com o rótulo, em caixa baixa.
  * `10 trilhas por onde ir (to do's)`
  * `10 matas para evitar (don'ts)`
* **Itens:** 10 por lado; 1–2 linhas cada; caixa baixa; sem ponto final.
* **Paralelismo:** comece os itens com verbo no infinitivo ou substantivo concreto. Evite misturar frases nominais e orações completas.
* **Ritmo:** alterne itens curtos e médios; evite três itens longos seguidos.
* **Medida:** 30–34 caracteres por linha no desktop. No mobile, 26–30ch.

### 9.2 Tom de voz

* Direto, concreto e sem jargão corporativo.
* Prefira verbos de ação: "incluir", "fazer", "evitar", "investir".
* Use "você" implícito; não escreva "nós acreditamos que".
* Nada de superlativos vazios ("incrível", "revolucionário").
* O lado "don'ts" não é humor negativo; é orientação prática.

### 9.3 Exemplo canônico

**Do's — papel**

1. a qualidade criativa precisa estar explícita
2. mentalidade "TikTok-First"
3. formato como convite, não interrupção

**Don'ts — oliva**

1. incluir logos ou nomes da agência
2. fazer "control c + control v" de outras premiações
3. fazer um videocase chato ou puramente institucional

> O exemplo acima mostra 3 itens por lado; a peça completa usa 10. Use o conteúdo completo da peça de referência como exemplo de tom, não como texto fixo do produto.

---

## 10. Acessibilidade & Uso

1. **Contraste (WCAG AA):**
   * `forest-deep` sobre `paper`: **12.1:1** (AAA).
   * `forest-dark` sobre `paper`: **9.7:1** (AAA).
   * `cream-paper` sobre `olive`: **5.0:1** (AA para texto normal; AAA para texto grande).
   * `cream-light` sobre `olive-deep`: **7.0:1** (AAA).
   * `forest-deep` sobre `amber`: **4.9:1** (AA; use apenas ícones/glifos, não blocos de texto).
2. **Tamanho mínimo:** corpo de texto 16px; listas editoriais 18px; labels 11px apenas em caixa alta e com tracking.
3. **Não use apenas cor para transmitir estado.** Do's/don'ts são separados por título, numeração e campo de cor; nunca dependa só do verde/oliva.
4. **Foco visível:** anel de 2px com offset de 2px.
   * Sobre papel/creme: âmbar `#C88238`.
   * Sobre oliva/verde profundo: `cream-paper` `#EFE4C7` (o âmbar tem contraste insuficiente sobre oliva).
5. **Texto sobre ilustração:** não permitido. Se precisar, adicione um campo de cor sólido atrás.
6. **Ilustrações:** decorativas usam `alt=""`; informativas têm descrição curta. O mascote não é um controle.
7. **Nomes científicos:** use `<i lang="la">` para leitores de tela.
8. **Movimento:** respeite `prefers-reduced-motion`; texturas e ilustrações são estáticas.
9. **Alvos de toque:** mínimo de 44×44px para chips de contato, botões e links de ícone.
10. **Placeholders:** `muted` (`#8C826B`) tem apenas 3.0:1 sobre papel; use para placeholder/desabilitado e nunca para instruções essenciais.

---

## 11. Implementação (Tokens & Classes)

### 11.1 Tokens CSS

```css
:root {
  /* Campos editoriais */
  --color-cream-paper: #EFE4C7;
  --color-forest-olive: #55663A;
  --color-forest-olive-deep: #46552F;
  --color-forest-olive-light: #6B7C4E;

  /* Verdes */
  --color-forest-deep: #122A1E;
  --color-forest-dark: #1A3B2B;
  --color-forest-medium: #2D5540;
  --color-forest-light: #4C7059;

  /* Creme, areia e acentos */
  --color-cream-base: #E8DFC8;
  --color-cream-light: #F4EFE2;
  --color-cream-dark: #D9CEB4;
  --color-earth-amber: #C88238;
  --color-earth-amber-dark: #8A531F;
  --color-earth-amber-light: #E3A45E;
  --color-charcoal: #181C19;
  --color-sand: #D2C5A7;
  --color-muted: #8C826B;

  /* Tipografia */
  --font-family-display: 'Fraunces', Georgia, Cambria, 'Times New Roman', serif;
  --font-family-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --tracking-brand: 0.15em;
  --tracking-lockup: 0.28em;
}
```

### 11.2 Mapa Tailwind

| Token | Classe Tailwind |
| :--- | :--- |
| Papel editorial | `bg-cream-paper` / `text-cream-paper` |
| Oliva | `bg-forest-olive` / `text-forest-olive` |
| Oliva profunda | `bg-forest-olive-deep` |
| Oliva clara | `bg-forest-olive-light` |
| Verde profundo | `bg-forest-deep` / `text-forest-deep` |
| Âmbar (fundo de ícone) | `bg-earth-amber` + `text-forest-deep` |
| Âmbar (texto sobre claro) | `text-earth-amber-dark` |
| Creme base | `bg-cream-base` / `text-cream-base` |
| Creme claro | `bg-cream-light` / `text-cream-light` |

Escala tipográfica disponível como utilitários: `text-display-xl`, `text-display-lg`, `text-display-md`, `text-editorial-lg`, `text-editorial`, `text-label` e `text-lockup-sub`.

### 11.3 Classes de componente

Adicionadas em `app/styles/globals.css`:

* `.surface-paper` — campo de papel editorial.
* `.surface-olive` — campo de oliva editorial.
* `.split-editorial` — grid 50/50 responsivo.
* `.split-panel` — padding editorial responsivo.
* `.editorial-title` — título serifado com `clamp()`.
* `.editorial-list` — lista numerada com hanging indent.
* `.btn-on-olive` — botão creme para usar dentro do painel oliva.
* `.contact-chip` / `.contact-chip-icon` — contato com círculo âmbar.
* `.contact-chip-light` — variante para fundos claros.
* `.brand-footer` / `.brand-footer-inner` — rodapé de marca e grid responsivo.
* `.brand-footer-mascot`, `.brand-footer-name`, `.brand-footer-species`, `.brand-footer-description`, `.brand-footer-divider`, `.brand-footer-contacts` — partes do rodapé.
* `.topo-lines` / `.topo-lines-flip` — textura topográfica de canto para fundos escuros ou claros.

### 11.4 Arquivos

* `design_system_tapitise.md` — esta documentação.
* `app/styles/globals.css` — tokens CSS e classes de componente.
* `tailwind.config.js` — paleta e utilidades.
* `app/layout.tsx` — carregamento de Fraunces (incluindo itálico) + Plus Jakarta Sans.
* `app/components/brand-mark.tsx` — símbolo provisório da marca no app; substituir pelo asset oficial quando disponível.
* `config/index.ts` — dados de contato da marca usados no login.

### 11.5 Onde está aplicado

* **Login** (`app/login/login-form.tsx`): painel oliva + papel, topografia, chips de contato e marca.
* **Workspace** (`app/components/index.tsx`): painel de criação em papel, resultado em verde profundo, topografia e tipografia editorial.
* **Estados** (`app/components/no-data`, `app/components/app-unavailable.tsx`): papel, verde profundo e acentos âmbar.
* **Marca** (`app/components/brand-mark.tsx`): símbolo compartilhado entre login e workspace.
* **Contato** (`config/index.ts`): `contact_email`, `contact_phone` e `contact_whatsapp`.

> **Compatibilidade:** nenhum token da v1.0 foi removido. Os novos campos são aditivos e podem ser adotados gradualmente.

---

## 12. Changelog

### v2.0 — 27/10/2026

* Adicionada a paleta editorial **papel + oliva** (`#EFE4C7`, `#55663A`, `#46552F`, `#6B7C4E`).
* Adicionado o padrão **painel editorial dividido** (do's/don'ts) com layout 50/50 e rodapé de marca.
* Serifa **Fraunces** passa a ser usada também no corpo editorial, não apenas em títulos.
* Adicionados o mascote **tapiti** (*Sylvilagus brasiliensis*), as regras de ilustração botânica e as linhas topográficas.
* Adicionado o **rodapé de marca** com logotipo, descritor, informação institucional e chips de contato.
* Corrigidos os valores de contraste WCAG e documentados os pares proibidos.
* Adicionados `.surface-paper`, `.surface-olive`, `.split-editorial`, `.editorial-list`, `.btn-on-olive`, `.contact-chip` e `.topo-lines`.
* Adicionados os utilitários `text-display-*`, `text-editorial-*`, `text-label`, `text-lockup-sub` e `tracking-lockup`.
* Aplicado ao login, ao workspace principal e aos estados de erro/vazio (papel, oliva, verde profundo e topografia).
* Ajustadas as regras de raio: cantos retos em painéis editoriais; círculos apenas em badges, avatares e contatos.

### v1.0

* Versão inicial: paleta floresta/creme, tipografia Fraunces + Plus Jakarta Sans, botões, cards, inputs, badges e sombras woodcut.

---

*Documentação mantida pela equipe de Design & Produto da **Tapítise**.*
