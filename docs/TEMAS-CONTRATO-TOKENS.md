# Temas e contrato de tokens (Demos HTML)

Documentação rápida para retomar trabalho em novos temas e consistência visual.

## Onde está a fonte da verdade

- **Arquivo:** `demos/ds-demo-base.css`
- **Temas:** `:root` (padrão), `[data-ds-theme="dark"]`, `[data-ds-theme="ringgo"]` (light) e `[data-ds-theme="ringgo-dark"]`. Em Design Tokens, o seletor inclui **Ringgo (light)** e **Ringgo (dark)**.
- **Persistência entre páginas:** `localStorage` com chave `ds-theme` (`light` | `dark` | `ringgo` | `ringgo-dark`), aplicada em `document.documentElement.dataset.dsTheme` (ver `demos/ds-demo-sidebar.js` e `demos/index.html`).
- **Contraste em botão primário Ringgo:** `--ds-on-brand-primary` (#0A0A0B) sobre `--ds-success` (#03D062) para WCAG AA; noutros temas o token cai no fallback `--ds-on-inverse`.

## Tokens semânticos (preferir estes em código novo)

| Token | Uso |
|-------|-----|
| `--ds-text-primary` | Texto principal |
| `--ds-text-secondary` | Texto secundário / legendas |
| `--ds-text-tertiary` | Texto mais sutil |
| `--ds-placeholder` | Placeholders e estados “vazio” simulado |
| `--ds-icon-muted` | Ícones neutros (ex.: close em drawer/modal) |
| `--ds-icon-accent` | Ícones de ação / chevron de select custom |

## Aliases de compatibilidade

Os tokens antigos continuam válidos e apontam para os semânticos:

- `--ds-fg`, `--ds-fg-muted`, `--ds-fg-subtle`
- `--ds-content-primary|secondary|tertiary`
- `--ds-n500`, `--ds-n800` (mapeados a partir de `fg`)

Evite introduzir novos hex em demos; use `var(--ds-*)`.

## React (`FinalComponents.jsx`)

Cores de conteúdo usam `var(--ds-content-*, var(--ds-text-*, fallback))` para alinhar com o CSS base. Importe `ds-demo-base.css` na app para white-label e temas.

## Drawer / Modal (demos HTML)

- Botão fechar (`.close-btn`): cor controlada globalmente para `--ds-icon-muted` (neutral 200 no light).
- `select` nativo: aparência e opções tokenizadas em `ds-demo-base.css` (inclui placeholder `option` disabled/hidden).

## Select custom (`select-demo.html`)

- Chevron e ícones auxiliares usam `currentColor` + regras em `ds-demo-base.css`.
- Surfaces/bordas devem usar `--ds-surface` e `--ds-border`.

## Próximos passos sugeridos

- Varredura de `stroke="#..."` / hex restantes em outras demos (`index.html`, `input-demo.html`, etc.).
- Checar chevron dos `select` nativos em dark (SVG data-URL do drawer/modal usa verde fixo; opcional migrar para variável/CSS mask).
- Atualizar links obsoletos em `docs/README-DESIGN-SYSTEM.md` (páginas demos removidas).
