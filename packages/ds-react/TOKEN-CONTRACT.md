# Contrato de tokens CSS (`--ds-*`)

Componentes publicados em `@meu-ds/react` **não** embutem cores fixas: dependem de variáveis no `:root` (ou num antepassado temático, ex.: `[data-ds-theme="dark"]`).

## Fonte de verdade (hoje)

- **Demos / tema completo:** `demos/ds-demo-base.css` (light + overrides em `[data-ds-theme="dark"]`).
- **Playground:** `apps/ds-docs` importa esse ficheiro para espelhar o mesmo tema das páginas HTML.

Antes de publicar o pacote no npm, alinhar uma estratégia única (copiar subset, gerar a partir de JSON, ou pacote `@meu-ds/tokens`).

## Variáveis usadas pelo `Button` (v0.1)

| Token | Uso |
|--------|-----|
| `--ds-font-family` | Tipografia |
| `--ds-font-size-md` | Tamanho do texto |
| `--ds-font-weight-semibold` | Peso |
| `--ds-line-height-tight` | Altura de linha |
| `--ds-space-sm`, `--ds-space-lg` | Padding / gap |
| `--ds-radius-md` | Raio |
| `--ds-success` | Fill / borda primária |
| `--ds-success-hover` | Hover primário |
| `--ds-success-bg`, `--ds-success-fg` | Secundário / ghost |
| `--ds-on-inverse` | Texto sobre superfícies escuras / secundárias (ex.: azul `#13375A`) |
| `--ds-on-brand-primary` | Texto sobre fill `--ds-success` (ex.: Ringgo usa `#0A0A0B` em botão primário para WCAG AA); padrão: igual a `--ds-on-inverse` |
| `--ds-focus-ring` | Foco visível |

## Regras para novos componentes

1. Preferir sempre `var(--ds-*)`; evitar hex/rgb nos ficheiros `.tsx` / `.css` do pacote.
2. Documentar aqui (ou num ficheiro gerado) qualquer token novo **obrigatório** para o componente.
3. Validar contraste em **light** e **dark** quando existir override em `ds-demo-base.css`.

## Consumo na aplicação

```html
<link rel="stylesheet" href="node_modules/…/ds-demo-base.css" />
<link rel="stylesheet" href="node_modules/@meu-ds/react/style.css" />
```

Ou import equivalente em bundler. O `style.css` do pacote contém apenas os estilos dos componentes React; os **valores** dos tokens vêm da folha de tema.
