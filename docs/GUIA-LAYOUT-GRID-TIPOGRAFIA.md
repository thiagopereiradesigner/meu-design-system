# Layout, Grid, Container e Tipografia — Guia do Design System

Documento de **fundação** para construir telas e landings com consistência.

Alinhado a **mobile first**, **WCAG 2.1 AA** e preparado para **white-label** via **tokens** (CSS variables) para que a estrutura permaneça, mas a identidade (cores/tipografia) possa variar.

---

## 1) Princípios

- **Mobile first**: estilos base para telas estreitas; melhorias progressivas via `min-width`.
- **Container != viewport**: o conteúdo pode ter largura máxima (ex.: `1440px`) mesmo em monitores maiores.
- **Grid 12 colunas**: alinhamento consistente entre layouts e seções.
- **Tipografia semântica**: heading, parágrafo, subtítulo e label com tamanhos e interlinhas definidos.

---

## 2) Breakpoints (min-width)

| Token | Largura mínima | Uso típico |
|-------|----------------|------------|
| base  | 0              | Smartphones (ref. ~360px) |
| sm    | 744px          | Tablets / telas médias |
| md    | 1024px         | Tablet paisagem / laptop pequeno |
| lg    | 1280px         | Desktop |
| xl    | 1728px         | Telas largas |
| full  | 1920px         | Referência “full width” do viewport |

> Nota: entre `sm` (744) e `lg` (1280) existe `md` (1024) para evitar saltos grandes no layout.

---

## 3) Container

Objetivo: centralizar conteúdo e limitar a legibilidade.

| Propriedade | Valor |
|-------------|--------|
| Largura máxima | `1440px` |
| Padding horizontal (base) | `16px` |
| Padding horizontal (>= sm) | `24px` |
| Padding horizontal (>= lg) | `32px` |
| Centralização | `margin-left/right: auto` |

Classe utilitária: `.ds-container`

---

## 4) Grid (12 colunas)

| Breakpoint | Gutter (entre colunas) |
|------------|--------------------------|
| base       | `16px` |
| >= md      | `24px` |
| >= lg      | `32px` |

Classe utilitária: `.ds-grid-12`

> Para spans: `grid-column: span N`.

---

## 5) Tipografia (Inter)

Os tamanhos abaixo seguem a escala que você já definiu e mantêm headings com **line-height 120%**.

### 5.1) Headings

| Estilo | Tamanho (mobile) | Tamanho (>= sm) | Peso |
|--------|--------------------|------------------|------|
| h1 | 32px | 44px | 700 |
| h2 | 28px | 40px | 700 |
| h3 | 26px | 32px | 600 |
| h4 | 24px | 24px | 600 |
| h5 | 20px | 20px | 600 |
| h6 | 18px | 18px | 600 |

Todos com line-height **1.2**.

Classes:
- `.ds-heading-1` … `.ds-heading-6`

### 5.2) Subtítulo (semibold)

| Token | Tamanho | Interlinha | Peso |
|--------|---------|-------------|------|
| subtitle-l | 16px | 150% | 600 |
| subtitle-m | 14px | 150% | 600 |
| subtitle-s | 12px | 150% | 600 |

Classes:
- `.ds-subtitle-l` / `.ds-subtitle-m` / `.ds-subtitle-s`

### 5.3) Parágrafo (corpo)

| Token | Tamanho | Interlinha | Peso |
|--------|---------|-------------|------|
| body-l | 16px | 150% | 400 |
| body-m | 14px | 150% | 400 |
| body-s | 12px | 150% | 400 |

Classes:
- `.ds-body-l` / `.ds-body-m` / `.ds-body-s`

### 5.4) Label

| Token | Tamanho | Interlinha | Peso |
|--------|---------|-------------|------|
| label-l | 14px | 150% | 500 |
| label-m | 12px | 150% | 500 |
| label-s | 10px | 150% | 500 |

> Recomendação: `label-s (10px)` é para metadados/visuais (ex.: badges). Texto essencial, idealmente, use `>= 12px`.

Classes:
- `.ds-label-l` / `.ds-label-m` / `.ds-label-s`

### 5.5) Link

Classes:
- `.ds-link` (underline e `:focus-visible` para teclado)

---

## 6) White-label (multi-parceiro)

Para manter a “mesma estrutura” entre parceiros, use:

- **Estrutura** (layout, grid, spacing) via classes fixas do DS.
- **Identidade** (cores e tipografia) via **tokens** (`--ds-*`) definidos no `:root` ou sobrescritos por parceiro.

Padrão sugerido de sobrescrita:

- Um parceiro define `--ds-primary`, `--ds-bg`, `--ds-n800`, `--ds-font-family` etc no wrapper do app (ex.: em um `<div data-ds-theme="fantasia">`).
- Os componentes e classes DS consultam apenas `--ds-*`, então a identidade muda sem quebrar a estrutura.

---

## 7) Checklist (UX + WCAG)

- [ ] Mobile first: testar em largura ~360px.
- [ ] Conteúdo principal dentro do container max 1440px.
- [ ] Contraste AA em texto e estados.
- [ ] Foco visível em links e elementos interativos (teclado).
- [ ] Labels essenciais preferir `>= 12px`.

---

## Changelog

**v1.0**
- Breakpoints base/sm/md/lg/xl/full
- Container max 1440px + padding responsivo
- Grid 12 colunas com gutter por breakpoint
- Classes de tipografia: headings/subtitle/body/label/link

