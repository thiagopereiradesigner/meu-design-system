# Regras para gerar JSON de tema (`--ds-*`)

## Formato

- Arquivo JSON UTF-8.
- Raiz: `schemaVersion` (número, use `1`), `themeName` (string, slug ou nome legível), opcional `description`.
- Objetos **`light`** e **`dark`**: mapas de nome de variável CSS → valor string.

## Nomes permitidos

- Use **somente** chaves que começam com `--ds-` e existem no contrato do design system (ex.: `--ds-success`, `--ds-border`, `--ds-text-primary`, `--ds-shadow-sm`, `--ds-focus-ring`, …).
- **Marcas de cor:** escalas importáveis `--ds-primary-*`, `--ds-neutral-*`, **`--ds-color-brand-secondary-*`** (slate blue), **`--ds-color-brand-accent-*`** (violet padrão) e famílias **`--ds-color-brand-accent-warm-*`**, **`-teal-*`**, **`-rose-*`**, **`-indigo-*`** (passos 50–900). Atalhos de UI: `--ds-secondary`, `--ds-secondary-fg`, `--ds-accent`, `--ds-accent-fg`, `--ds-accent-muted-bg`, `--ds-accent-warm`, `--ds-accent-teal`, `--ds-accent-rose`, `--ds-accent-indigo` — use **valores literais** resolvidos, não `var(...)`. Referência: `demos/theme-tokens-import.template.json`.
- Valores: cores em `#RRGGBB` / `#RGB`, `rgba(...)`, `hsl(...)`, ou referências já resolvidas; sombras como string completa (`box-shadow`).
- **Não** use `var(--outra)` dentro do JSON importado — o playground aplica valores literais na raiz do documento.

## Light vs dark

- **`light`**: paleta para `data-ds-theme` ausente ou `light`.
- **`dark`**: paleta para `data-ds-theme="dark"`.
- Mantenha **contraste WCAG** (texto vs fundo ≥ 4.5:1 para corpo, 3:1 para UI) ao alterar pares como `--ds-text-primary` / `--ds-bg`.

## Segurança

- Não inclua scripts, HTML ou chaves fora do padrão `--ds-*` — importadores devem ignorar chaves desconhecidas.

## Export

- Use o botão “Exportar tema” na página Design Tokens para obter um JSON completo com valores **resolvidos** do navegador e reutilizar como base.
